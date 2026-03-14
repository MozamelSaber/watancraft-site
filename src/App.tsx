import "./App.css";

const seasons = [
  {
    title: "فصل ۱",
    subtitle: "شروع افسانه‌ وطن کرفت",
    description:
      "اولین فصل وطن‌کرفت با بیلد های عظیم، خانه های بازیکنان، پرچم افغانستان و خاطراتی که هویت سرور را ساخت.",
    download: "#",
    status: "آماده دانلود به زودی",
    image: "/Season_1_1.png",
    tags: ["بیس ها", "اولین سپاون", "بیلد های تاریخی"],
  },
  {
    title: "فصل ۲",
    subtitle: "ماجراجویی جدید",
    description:
      "فصل جدید وطن‌کرفت با شروع تازه، دنیای جدید، عملکرد بهتر و فضای جدید برای ساختن خاطرات بیشتر.",
    download: "#",
    status: "به زودی",
    image: "/Season_2_1.jpg",
    tags: ["شروع تازه", "عملکرد بهتر", "آرشیو جدید"],
  },
  {
    title: "فصل‌های آینده",
    subtitle: "تاریخ در حال ساخت",
    description:
      "فصل های آینده سروایول وطن کرفت در اینجا اضافه خواهد شد. منتظر خاطرات آینده خواهیم بود",
    download: "#",
    status: "رزرو شده",
    image: "/SeasonX.png",
    tags: ["قابل گسترش", "آماده گالری", "دانلود مستقیم"],
  },
];

const showcases = [
  {
    title: "اژدهای غروب",
    text: "یکی از معروف‌ترین صحنه‌های فصل ۱ با نور طلایی و ساخت عظیم اژدها.",
    image: "/Season_1_2.png",
  },
  {
    title: "منطقه‌ی پرچم افغانستان",
    text: "هویت افغانستان باید در سایت هم حس شود؛ درست مثل دنیای سرور.",
    image: "/Season_1_3.png",
  },
  {
    title: "شهر و برج‌ها",
    text: "نمایی از معماری، جاده‌ها، برج‌ها و فضای پرجزئیات وطن‌کرفت.",
    image: "/Season_1_4.png",
  },
  {
    title: "رودخانه و مجسمه‌ها",
    text: "ترکیب طبیعت، نور، آب و سازه‌های هنری که فصل ۱ را خاص کرد.",
    image: "/Season_1_5.png",
  },
  {
    title: "اسپاون و مسیرها",
    text: "فضای سرور باید حس زنده، ماجراجویانه و پرانرژی داشته باشد.",
    image: "/Season_1_6.png",
  },
  {
    title: "نمای کلی دنیا",
    text: "برای هر فصل می‌توانید عکس‌ها، توضیحات و فایل دنیا را اینجا نگه دارید.",
    image: "/Season_1_7.png",
  },
];

const downloads = [
  {
    name: "دانلود دنیای فصل ۱",
    detail: "فایل اصلی دنیای فصل ۱ برای آرشیو و بازدید دوباره",
    type: "ZIP / World File",
    status: "آماده",
    link: "#",
  },
  {
    name: "گالری فصل ۱",
    detail: "مجموعه تصاویر و نماهای منتخب از فصل ۱",
    type: "Image Gallery",
    status: "آماده",
    link: "#",
  },
  {
    name: "دانلود دنیای فصل ۲",
    detail: "وقتی فصل ۲ آماده شود، لینک دانلود مستقیم اینجا قرار می‌گیرد",
    type: "Coming Soon",
    status: "به‌زودی",
    link: "#",
  },
];

const rules = [
  "بی‌احترامی، توهین، تبعیض و آزار دیگران ممنوع است.",
  "دزدی، خرابکاری و برداشتن وسایل دیگران بدون اجازه ممنوع است.",
  "استفاده از هرگونه چیت، هک یا نرم‌افزار تقلبی ممنوع است.",
  "اسپم، پیام‌های تکراری و پینگ بی‌دلیل ممنوع است.",
  "نژادپرستی، زورگویی و تهدید دیگران ممنوع است.",
  "ارسال محتوای +۱۸ یا پروفایل نامناسب ممنوع است.",
  "اسکم، فریبکاری و سوءاستفاده از کاربران ممنوع است.",
  "استفاده از باگ یا گلیچ سرور ممنوع است و باید گزارش شود.",
];

const team = [

  {
    name: "Zako",
    role: "کو-اونر",
    text: "از مدیران اصلی وطن‌کرفت",
    link: "#",
    avatar: "/Zako.png",
  },
  {
    name: "TuraChi",
    role: "اونر",
    text: "تو ره چی؟ او خواهرک",
    link: "https://www.youtube.com/@TuraChi",
    avatar: "/Turachi.jpg",
  },
  {
    name: "KakaKaloo",
    role: "کو-اونر",
    text: "از مدیران اصلی وطن‌کرفت",
    link: "https://www.youtube.com/@KakaKaloo",
    avatar: "/Kalim.jpg",
  },
  {
    name: "Sayed",
    role: "مدیر ارشد",
    text: "مسئول مدیریت و نظارت کلی بر وطن‌کرفت که علاوه بر اختیارات کامل مدیریتی، به هاست سرور نیز دسترسی دارد.",
    link: "https://www.tiktok.com/@sayed_1732?_r=1&_t=ZG-94fKl2GcX1F",
    avatar: "/Sayed.png",
  },
  {
    name: "Samira",
    role: "قاضی",
    text: "ناظر بی‌طرف در تصمیم‌گیری‌های مهم وطن‌کرفت که در تعیین سیاست‌ها و نظارت بر عملکرد دولت نقش دارد.",
    link: "#",
    avatar: "/iSamo.jpg",
  },
  {
    name: "Ali",
    role: "OG",
    text: "از جمله بنیان گذاران سرور وطن کرفت",
    link: "https://youtube.com/@itzrealace?si=rkavGl3sM6dPOxWj",
    avatar: "/Ali.png",
  },
  {
    name: "Madisa",
    role: "گیم ماستر",
    text: "سئول مدیریت رویدادها، چالش‌ها و بازی ها در وطن‌کرفت. ",
    link: "https://www.instagram.com/mohammed_afg.25?igsh=MXNsYWwwbXRmNGdnZg==",
    avatar: "/Madisa.png",
  },
  {
    name: "MrRubik",
    role: "ادمین",
    text: "شخصی که فضای سرور و دیسکورد را امن، فعال و منظم نگه می‌دارد.",
    link: "#",
    avatar: "/MrRubik.png",
  },
];

function FlagPill() {
  return (
    <div className="flag-pill">
      <span className="flag-dot black"></span>
      <span className="flag-dot red"></span>
      <span className="flag-dot green"></span>
      <span className="flag-label">افغانستان</span>
    </div>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div className="wrapper topbar-inner">
        <a href="#hero" className="brand">
          <div className="brand-mark">W</div>
          <div>
            <div className="brand-title">وطن‌کرفت</div>
            <div className="brand-subtitle">آرشیو رسمی فصل‌ها</div>
          </div>
        </a>

        <nav className="nav">
          <a href="#seasons">فصل‌ها</a>
          <a href="#showcase">گالری</a>
          <a href="#downloads">دانلودها</a>
          <a href="#rules">قوانین</a>
          <a href="#team">تیم</a>
        </nav>

        <a className="cta-small" href="https://discord.com/invite/f6YE5Fd3HG" target="_blank" rel="noreferrer">
          ورود به دیسکورد
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="hero-glow hero-glow-3"></div>
      <div className="wrapper hero-grid">
        <div className="hero-copy">
          <div className="hero-pill-row">
            <div className="pill warm">پرانرژی • هیجان‌انگیز • اجتماعی</div>
            <FlagPill />
          </div>

          <h1>
            خانه‌ پررنگ و پرشور <span>وطن کرفت</span>
          </h1>

          <p className="hero-text">
            وطن‌کرفت اولین و تنها سرور ماینکرفت افغانستان است. این ویبسایت برای نگهداری فصل‌ها، تصاویر، لینک دانلود دنیاها
            و نمایش هویت خاص کامیونیتی وطن کرفت ساخته شده است.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#downloads">
              دانلود فصل‌ها
            </a>
            <a className="btn btn-secondary" href="https://discord.com/invite/f6YE5Fd3HG" target="_blank" rel="noreferrer">
              دریافت وایت لیست
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-label">آی پی سرور</div>
              <div className="stat-value">play.watancraft.fun</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">پلتفرم</div>
              <div className="stat-value">Java & Bedrock</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">عضویت</div>
              <div className="stat-value">Whitelist</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-main-card">
            <img
              src="public/Logo.png"
              alt="Watancraft artwork"
            />
            <div className="hero-card-overlay">
              <div className="overlay-title">وطن کرفت یکی از کامیونیتی گیمینگ افغانستان</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Seasons() {
  return (
    <section className="section" id="seasons">
      <div className="wrapper">
        <div className="section-head">
          <div className="section-pill">فصل‌ها</div>
          <h2>همه‌ فصل‌های وطن‌کرفت در یک جا</h2>
          <p>
            هر فصل می‌تواند صفحه‌ی خودش را داشته باشد؛ با معرفی فصل، تصاویر منتخب، بهترین سازه‌ها و لینک دانلود مستقیم.
          </p>
        </div>

        <div className="season-grid">
          {seasons.map((season) => (
            <article className="season-card" key={season.title}>
              <div className="season-image-wrap">
                <img src={season.image} alt={season.title} className="season-image" />
                <div className="season-badge">{season.status}</div>
              </div>
              <div className="season-body">
                <div className="season-topline">{season.subtitle}</div>
                <h3>{season.title}</h3>
                <p>{season.description}</p>
                <div className="tag-row">
                  {season.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a className="btn btn-primary full" href={season.download}>
                  مشاهده‌ی فصل
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="section section-alt" id="showcase">
      <div className="wrapper">
        <div className="section-head">
          <div className="section-pill">گالری</div>
          <h2>نمایی از حال و هوای فصل ۱</h2>
          <p>
            این قسمت برای نمایش بهترین اسکرین‌شات‌های هر فصل است تا سایت زنده، رنگی و هیجان‌انگیز به نظر برسد.
          </p>
        </div>

        <div className="showcase-grid">
          {showcases.map((item) => (
            <div className="showcase-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div className="showcase-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Downloads() {
  return (
    <section className="section" id="downloads">
      <div className="wrapper downloads-layout">
        <div>
          <div className="section-head left">
            <div className="section-pill">دانلودها</div>
            <h2>لینک دانلود مستقیم برای هر فصل</h2>
            <p>
              این بخش فقط برای دانلود رسمی فصل‌ها است. کاربران چیزی آپلود نمی‌کنند و شما فقط لینک‌های رسمی هر دنیا را قرار می‌دهید.
            </p>
          </div>

          <div className="download-list">
            {downloads.map((item) => (
              <div className="download-card" key={item.name}>
                <div>
                  <div className="download-title">{item.name}</div>
                  <div className="download-meta">
                    {item.type} • {item.status}
                  </div>
                  <p>{item.detail}</p>
                </div>
                <a className="btn btn-primary" href={item.link}>
                  دانلود
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Rules() {
  return (
    <section className="section section-alt" id="rules">
      <div className="wrapper rules-layout">
        <div className="section-head left narrow">
          <div className="section-pill">قوانین</div>
          <h2>قوانین سرور و دیسکورد</h2>
          <p>
            قوانین مهم جامعه‌ی وطن‌کرفت به زبان فارسی، با نمایش خوانا و تمیز برای همه‌ی اعضا.
          </p>
          <div className="rules-note">
            مسئولیت آگاهی از قوانین و رعایت آن‌ها بر عهده‌ی خود شماست و در صورت تخلف ممکن است وارن، تایم‌اوت یا بن اعمال شود.
          </div>
        </div>

        <div className="rules-card">
          {rules.map((rule, index) => (
            <div className="rule-row" key={rule}>
              <div className="rule-number">{index + 1}</div>
              <div className="rule-text">{rule}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
      <section className="section" id="team">
        <div className="wrapper">
          <div className="section-head">
            <div className="section-pill">تیم</div>
            <h2>افراد پشت وطن‌کرفت</h2>
            <p>جامعه‌ی وطن‌کرفت توسط افرادی ساخته شده که با عشق و انرژی آن را زنده نگه داشته‌اند.</p>
          </div>

          <div className="team-grid">
            {team.map((member) => (
                <div className="team-card" key={member.name}>
                  <img src={member.avatar} alt={member.name} className="team-avatar" />
                  <div className="team-role">{member.role}</div>
                  <h3>{member.name}</h3>
                  <p>{member.text}</p>
                  <a href={member.link} target="_blank" rel="noreferrer">
                    مشاهده
                  </a>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper footer-inner">
        <div>
          <div className="footer-title">وطن‌کرفت</div>
          <div className="footer-text">اولین و تنها سرور ماینکرفت افغانستان</div>
          <div className="footer-flag-row">
            <FlagPill />
          </div>
        </div>

        <div className="footer-actions">
          <a className="btn btn-secondary" href="https://discord.com/invite/f6YE5Fd3HG" target="_blank" rel="noreferrer">
            دیسکورد
          </a>
          <a className="btn btn-secondary" href="https://www.youtube.com/@TuraChi" target="_blank" rel="noreferrer">
            یوتیوب
          </a>
          <div className="footer-ip">play.watancraft.fun</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div dir="rtl" className="site-shell">
      <Header />
      <Hero />
      <Seasons />
      <Showcase />
      <Downloads />
      <Rules />
      <Team />
      <Footer />
    </div>
  );
}
