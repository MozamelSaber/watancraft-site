// Deploy on the existing Cloudflare Worker, not GitHub Pages.
// Secrets: DISCORD_BOT_TOKEN, DISCORD_GUILD_ID, STAFF_IDS (JSON name -> ID).
// Public responses contain only the fields used by the website.
const ROLE = '1470843290307006588';
const STAFF = ['TuraChi', 'Zako', 'Ali', 'MrRubik', 'Madisa'];
const HIDDEN = new Set(['1175892534812221454','868364926002036776','917410857695211540']);
const ORIGINS = new Set(['https://watancraft.fun','https://www.watancraft.fun','https://mozamelsaber.github.io']);
const snowflake = value => typeof value === 'string' && /^\d{17,20}$/.test(value);
export function avatar(member, guildId) {
 const user = member.user;
 if (member.avatar) return `https://cdn.discordapp.com/guilds/${guildId}/users/${user.id}/avatars/${member.avatar}.webp?size=256`;
 if (user.avatar) return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=256`;
 const index = user.discriminator && user.discriminator !== '0' ? Number(user.discriminator) % 5 : Number((BigInt(user.id) >> 22n) % 6n);
 return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}
function publicMember(member, guildId, key) {
 return {id:member.user.id, name:member.nick || member.user.global_name || member.user.username, avatar:avatar(member,guildId), ...(key ? {key} : {})};
}
export async function roleMembers(api, guildId) {
 let after='0'; const found=[];
 for(let page=0;page<100;page++) {
  const members=await api(`/guilds/${guildId}/members?limit=1000&after=${after}`);
  if(!Array.isArray(members))throw Error('Invalid Discord response');
  for(const m of members)if(m.roles?.includes(ROLE) && !HIDDEN.has(m.user.id))found.push(publicMember(m,guildId));
  if(members.length<1000)return found;
  const next=members[members.length-1].user.id;
  if(BigInt(next)<=BigInt(after))throw Error('Pagination did not advance');
  after=next;
 }
 throw Error('Member pagination limit reached');
}
export default {
 async fetch(request,env,ctx) {
  const origin=request.headers.get('Origin');
  const headers={'Content-Type':'application/json; charset=utf-8','Vary':'Origin','X-Content-Type-Options':'nosniff'};
  if(origin && !ORIGINS.has(origin))return new Response('Origin not allowed',{status:403});
  if(origin)headers['Access-Control-Allow-Origin']=origin;
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'GET, OPTIONS'}});
  if(request.method!=='GET')return new Response('Method not allowed',{status:405,headers});
  const path=new URL(request.url).pathname.replace(/\/$/,'');
  if(path!=='/staff'&&path!==`/${ROLE}`)return new Response('Not found',{status:404,headers});
  const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers});
  if(!env.DISCORD_BOT_TOKEN||!snowflake(env.DISCORD_GUILD_ID))return reply({error:'Discord integration is not configured'},503);
  const cache=globalThis.caches?.default;
  const cacheKey=new Request(new URL(path,request.url).href);
  const cached=await cache?.match(cacheKey);
  if(cached){const response=new Response(cached.body,cached);Object.entries(headers).forEach(([k,v])=>response.headers.set(k,v));return response;}
  const api=async path=>{
   const result=await fetch(`https://discord.com/api/v10${path}`,{headers:{Authorization:`Bot ${env.DISCORD_BOT_TOKEN}`},signal:AbortSignal.timeout(10000)});
   if(!result.ok)throw Error(`Discord status ${result.status}`);
   return result.json();
  };
  try {
   let members;
   if(path==='/staff') {
    const ids=JSON.parse(env.STAFF_IDS||'{}');
    if(!STAFF.every(key=>snowflake(ids[key])))return reply({error:'Staff Discord IDs must be configured'},503);
    members=[];
    for(const key of STAFF)members.push(publicMember(await api(`/guilds/${env.DISCORD_GUILD_ID}/members/${ids[key]}`),env.DISCORD_GUILD_ID,key));
   } else members=await roleMembers(api,env.DISCORD_GUILD_ID);
   const response=reply({count:members.length,members});
   response.headers.set('Cache-Control','public, max-age=300');
   if(cache){const stored=response.clone();stored.headers.delete('Access-Control-Allow-Origin');stored.headers.delete('Vary');ctx.waitUntil(cache.put(cacheKey,stored));}
   return response;
  }catch{return reply({error:'Discord is temporarily unavailable'},502);}
 }
};
