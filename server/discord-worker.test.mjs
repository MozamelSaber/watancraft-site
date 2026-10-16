import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker,{avatar,roleMembers,STAFF_IDS} from './discord-worker.mjs';
const user={id:'123456789012345678',username:'Builder',discriminator:'0',avatar:'abc'};
test('guild avatar takes priority over account avatar',()=>assert.equal(avatar({user,avatar:'guildhash'},'987'),'https://cdn.discordapp.com/guilds/987/users/123456789012345678/avatars/guildhash.webp?size=256'));
test('account and default avatar fallback',()=>{assert.match(avatar({user},'987'),/avatars\/123456789012345678\/abc/);assert.match(avatar({user:{...user,avatar:null}},'987'),/embed\/avatars\/[0-5].png/);});
test('role lookup follows every page and excludes hidden users',async()=>{let calls=0;const result=await roleMembers(async path=>{calls++;if(calls===1)return Array.from({length:1000},(_,i)=>({user:{...user,id:String(100000000000000000n+BigInt(i))},roles:[]}));assert.match(path,/after=100000000000000999/);return [{user,roles:['1470843290307006588']},{user:{...user,id:'1175892534812221454'},roles:['1470843290307006588']}];},'987');assert.equal(calls,2);assert.equal(result.length,1);assert.equal(result[0].name,'Builder');assert.equal(result[0].roles,undefined);});
test('invalid staff override reports unavailable instead of returning incorrect people',async()=>{const res=await worker.fetch(new Request('https://example.com/staff'),{DISCORD_BOT_TOKEN:'test',DISCORD_GUILD_ID:'123456789012345678',STAFF_IDS:'{}'},{waitUntil(){}});assert.equal(res.status,503);});
test('only known routes and methods are exposed',async()=>{assert.equal((await worker.fetch(new Request('https://example.com/arbitrary-role'),{},{})).status,404);assert.equal((await worker.fetch(new Request('https://example.com/staff',{method:'POST'}),{},{})).status,405);});
test('unknown browser origins are rejected',async()=>assert.equal((await worker.fetch(new Request('https://example.com/staff',{headers:{Origin:'https://untrusted.example'}}),{},{})).status,403));

test('staff endpoint uses all five verified IDs and the MompAli display key',async(t)=>{
 const requests=[];
 t.mock.method(globalThis,'fetch',async url=>{
  requests.push(url);const id=url.split('/').at(-1);
  return Response.json({user:{...user,id},roles:[]});
 });
 const res=await worker.fetch(new Request('https://example.com/staff'),{DISCORD_BOT_TOKEN:'test',DISCORD_GUILD_ID:'123456789012345678'},{waitUntil(){}});
 assert.equal(res.status,200);const data=await res.json();assert.equal(data.count,5);
 assert.deepEqual(data.members.map(m=>[m.key,m.id]),Object.entries(STAFF_IDS));
 assert.equal(data.members.find(m=>m.key==='MompAli').id,'1421757876048756858');
 assert.equal(data.members.some(m=>m.key==='Ali'||m.key==='Samira'),false);
 assert.equal(requests.length,5);
 for(const [key,id] of Object.entries(STAFF_IDS))assert.ok(requests.some(url=>url.endsWith('/members/'+id)),key);
});
