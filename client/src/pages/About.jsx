import React from "react";
import aboutPic from "../public/about.png";

export default function About() {
  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 text-right mb-8">
        درباره ما
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-start py-10">
        <div className="max-w-xl ml-4">
          <p className="mb-4 text-slate-700 text-justify">
            معاملات شما به دنبال ایجاد تجربه‌ای بی‌نظیر برای مشتریان خود در حوزه خرید،
            فروش و اجاره املاک هستیم. با تیمی مجرب از مشاوران و متخصصان بازار
            املاک، تلاش می‌کنیم تا فرآیند انتخاب و معامله املاک را ساده، شفاف و
            کارآمد کنیم.
          </p>
          <p className="mb-4 text-slate-700 text-justify">
            مأموریت ما ارائه یک پلتفرم مطمئن و آسان برای مشتریان است که بتوانند
            با آرامش خاطر بهترین انتخاب‌ها را برای خرید و فروش املاک خود داشته
            باشند. ما به ارزش‌هایی همچون شفافیت، اعتماد و نوآوری متعهدیم و
            همواره در تلاشیم تا با استفاده از فناوری‌های روز، خدمات بهتری به
            مشتریان ارائه کنیم.
          </p>
          <p className="mb-4 text-slate-700 text-justify">
            چه به دنبال خرید خانه‌ای رویایی باشید و چه بخواهید سرمایه‌گذاری در
            املاک انجام دهید، معاملات شما همراه شما در تمامی مراحل خواهد بود. ما
            اعتقاد داریم که خرید و فروش ملک باید ساده و بدون دغدغه باشد، و در
            این مسیر با شما همکاری خواهیم کرد تا بهترین تصمیم‌ها را بگیرید.
          </p>
          <p className="mb-4 text-slate-700 text-justify">
            ما به اهمیت ایجاد ارتباطی نزدیک و مؤثر با مشتریان خود پی برده‌ایم و
            به همین دلیل، همیشه در دسترس شما خواهیم بود تا به تمامی سوالات و
            نیازهای شما پاسخ دهیم. تیم ما با تجربه و دانش عمیق از بازار املاک،
            به شما مشاوره‌ای دقیق و حرفه‌ای ارائه می‌دهد تا بتوانید با اطمینان و
            اعتماد کامل، تصمیمات هوشمندانه‌تری بگیرید.
          </p>
        </div>
        <div className="flex justify-center mt-6 md:mt-0">
          <img
            className="h-64 md:h-80 object-cover rounded-lg "
            src={aboutPic}
            alt="About Us"
          />
        </div>
      </div>
    </div>
  );
}
