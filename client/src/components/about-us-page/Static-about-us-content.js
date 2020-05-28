import React from 'react';

const StaticAboutUsPageContent = () => {
    return (
        <div className='about-us'>
            <section className='header-page-about-us'>
                <div className='header-page-about-us-describe'>
                    <h2 className='header-about-us-h2'>Nature Choice</h2>
                    <p className='header-about-us-p'>We are the e-commerce online shop with ecological clothes. We
                        provide an exceptional style for everybody that made of eco-friendly or recycled materials. Nature
                        Choice – look exclusive and save the Planet! When we think of pollution, we think of big oil companies
                        and smog from coal mines—but the truth is, the fast fashion industry is one of the central polluting
                        industries in the world. Not only is clothing production harmful to our planet, but the process
                        also kills thousands of farmers and producers each year due to chemicals and waste. Thankfully,
                        brands are becoming increasingly mindful and are utilizing more eco-friendly production methods,
                        including low-impact dying, upcycling natural materials, and growing organic pesticide-free
                        cotton.</p>
                </div>
                <div className='header-page-about-us-image'>
                    <img src="/images/about-us/eco-friendly-fashion.png" alt="Eco-cloth"/>
                </div>
            </section>
            <section className='body-page-about-us'>
                <div className="body-page-about-us-item">
                    <div className="body-page-about-us-item-image">
                        <img src="/images/about-us/branch-1.png" alt="Label branch"/>
                    </div>
                    <div className="body-page-about-us-item-describe">
                        <h3 className='body-about-us-h3'>Recycle</h3>
                        <p className='body-about-us-p'>All clothing has a useful second life. The collected garments
                            are sorted and graded as natural, synthetic and blended fabrics. Good quality clothing is
                            sent to charity institutions and is used as second hand clothing.</p>
                    </div>
                </div>
                <div className="body-page-about-us-item">
                    <div className="body-page-about-us-item-image">
                        <img src="/images/about-us/branch-2.png" alt="Label branch"/>
                    </div>
                    <div className="body-page-about-us-item-describe">
                        <h3 className='body-about-us-h3'>Organic</h3>
                        <p className='body-about-us-p'>The benefits of opting for organic clothing are literally
                            endless. First and foremost Mama Earth very much appreciates it, but she’s not the only one
                            who benefits from eco-friendly clothing! Clothes made from organic cotton are crazy
                            comfortable to wear, naturally breezy and sweat-wicking and highly durable which means you
                            spend less on replacing worn out clothes! Shop our collection of organic leggings and tops
                            for the comfort you and our planet deserve!</p>
                    </div>
                </div>
                <div className="body-page-about-us-item">
                    <div className="body-page-about-us-item-image">
                        <img src="/images/about-us/branch-3.png" alt="Label branch"/>
                    </div>
                    <div className="body-page-about-us-item-describe">
                        <h3 className='body-about-us-h3'>Eco-friendly</h3>
                        <p className='body-about-us-p'>We create eco friendly clothing with responsible materials and
                            sustainable practices throughout the entire process, from using solar-powered factories to
                            compostable shipping materials.</p>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default StaticAboutUsPageContent;
