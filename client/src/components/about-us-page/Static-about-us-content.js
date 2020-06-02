import React from 'react';

const StaticAboutUsPageContent = () => {
    return (
        <div className='about-us'>
            <section className='header-page-about-us'>
                <div className='header-page-about-us-describe'>
                    <h1 className='header-about-us-h2 underline'>РЮКЗАКИ ЯК ТЕРАПІЯ</h1>
                    <h4 className='header-about-us-h4 horondi'>HORONDI</h4>
                </div>
            </section>
            <section className='body-page-about-us'>
                <div className='body-page-about-us__about-owner'>
                    <h4 className='about-owner__title underline'>Сашко Горонді</h4>
                    <section className='about-owner__section-1 section'>
                        <p className='about-owner__param'> Привіт! Я Олександр Горонді – засновник бренду <span
                            className='horondi'>HORONDI</span>. Народився та виріс на Закарпатті і по правді кажучи -
                            перші 20 років мого життя були далеко не самим  приємними для спогадів чи розповідей.
                            У мене не було на кого рівнятись, від кого черпати натхнення та отримувати знання про
                            навколишній світ, як жити в ньому і по яких правилах. Тому, не маючи початково закладеного
                            підґрунту правильних моральний та духовних цінностей - я був підлітком, який легко потрапляє
                            під вплив. Хоч я і робив погані речі в житті, поганою людиною я себе не вважав. Робив все
                            те, що робили люди кругом, мовчки і без зайвих запитань. </p>
                    </section>
                    <section className='about-owner__section-2 section d-flex align-items-center flex-column flex-lg-row-reverse'>
                        <img className='about-owner__img w-50 mr-4 ml-4' src="./images/about-us/horondi.jpg"
                             alt="Oleksandr Horondi"/>
                        <p className='about-owner__param'>Проте, десь у глибині ще жив той справжній я, якого доводилось
                            приховувати, щоб мати змогу існувати в середовище, де я зростав. Я завжди хотів вірити,
                            що десь у світі для кожного з нас є особливе місце. Місце, де кожний з нас може наповнитись
                            барвами життя, розквітнути як весняна квітка розцвітає під теплими проміннями ранішнього сонця,
                            приносити радість оточуючим тебе людям. І, якби сталось так, що тим першим «вчителем», якого
                            я зустрів на своєму шляху був би хтось куди більш доброзичливий тоді хтозна як все склалось
                            б. </p>
                    </section>
                    <section className='about-owner__section-3 section d-flex align-items-center flex-column flex-lg-row'>
                        <img className='about-owner__img w-50 mr-4 ml-4' src="./images/about-us/horondi-2.jpeg"
                             alt="Oleksandr Horondi"/>
                        <p className='about-owner__param'> Але сталось як сталось і я вдячний цьому, бо ця, хоч і
                            терниста, стежка привела мене сюди. Шлях був довгий, але це історія зі щасливим кінцем і
                            мені вдалось віднайти себе і зайнятись власним ремеслом. Це справа, яка дарує радість
                            людям навколо. Справа – заради якої я просинаюсь зранку. Справа, яка мотивує мене рухатись
                            вперед.</p>
                    </section>

                    <section className='about-owner__section-4 section d-flex align-items-center flex-column flex-lg-row-reverse'>
                        <img className='about-owner__img w-50 mr-4 ml-4' src="./images/about-us/horondi-3.jpg"
                             alt="Oleksandr Horondi"/>
                        <p className='about-owner__param'>Можливо, не варто було писати цього всього вище, так як не
                            виключено, що ціль Вашого візиту просто купити річ, яка буде служити Вам багато років і
                            дарувати радість. Але <span className='horondi'>HORONDI</span> - це не просто речі, які
                            пошиті десь далеко за кордоном автоматизованими станками для шиття.
                            <span className='horondi'>HORONDI</span> - це дещо більше. Кожна річ, будь це наплічник,
                            гаманець чи сумочка – всі вони наділені душею, кожній з них я віддаю частинку своєї любові і
                            в такий спосіб маю можливість розділяти її з людьми. В світі немає нічого благороднішого для
                            мене ніж можливість викликати щиру посмішку на обличчях оточуючих і бачити радість в їхніх
                            очах. Тому, купуючи <span className='horondi'>HORONDI</span> – Ви даєте мені можливість
                            робити це.</p>
                    </section>
                </div>

                <div className='body-page-about-us__about-team mt-5'>
                    <h4 className='about-team__title underline'>Команда</h4>
                    <section className='about-team__section-1 section d-flex align-items-center flex-column flex-lg-row-reverse'>
                        <img className='about-owner__img mr-4 ml-4 w-25' src="./images/about-us/work-place-2.jpg" alt="Horondi team"/>
                        <p className='about-owner__param'>Наша команда складається з п‘ятьох чоловік, де кожен вірить в
                            те, що робить. Ми працюємо від зорі до зорі, щоб Ви могли вчасно отримати свій
                            <span className='horondi'>HORONDI</span>. Але при цьому ми не забуваємо про якість, яку Ви
                            також заслуговуєте. Вся наша продукція пошита з якісної та приємної на дотик тканини з
                            додатковим прошитим шаром дубляжу, що додає міцності та водостійкості. Дно зроблене з
                            міцного Оксфорду, шкіри чи еко-шкіри. </p>
                    </section>
                    <section className='about-team__section-2 section d-flex align-items-center flex-column flex-lg-row'>
                        <img className='about-owner__img w-50 mr-4 ml-4' src="./images/about-us/work-place.jpg"
                             alt="Horondi team"/>
                        <p className='about-owner__param'><span className='horondi'>HORONDI</span> розташований у Львові
                            і місце, де ми створюємо нашу продукцію завбільшки, як звичайна кімнати у Вашому домі. Тому,
                            зараз ми не можемо похвалитись масштабними нашого підприємства, але ми ще молоді і тільки
                            робимо перші кроки в цьому напрямку і з Вашою допомогою та підтримкою у нас все вийде!</p>
                    </section>
                </div>
            </section>
        </div>
    )
};

export default StaticAboutUsPageContent;
