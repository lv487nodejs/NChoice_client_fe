import React from 'react';

const StaticMaterialsContent = () => (
  <div className='materials-box'>
    <div className='header-page-materials'>
      <div className='header-page-materials-title'>
        Natural Sustainable Fibres
      </div>
    </div>
    <div className='about-materials'>
      <h2 className='about-materials-h2'>We choose yarns with great care</h2>
      <p className='about-materials-p'>
        We source natural, sustainable yarns that use less water, fewer
        pesticides, and create less CO2. And we upcycle our leftover fabric at
        source so to reduce waste and create new products.
      </p>
    </div>
    <div className='cotton-container'>
      <div className='material-title'>
        <h2 className='materials-h2'>
          COTTON{' '}
          <img width='35px' src='../images/materials/cotton.svg' alt='cotton' />
        </h2>
        <p className='materials-h3'>
          FROM CERTIFIED ORGANIC FARMS OR RECYCLED COTTON
        </p>
      </div>
      <div className='cotton-images'>
        <div
          className='material-img'
          style={{
            backgroundImage: 'url(/images/materials-photo/cotton1.webp)'
          }}
        >
          <div className='cotton-description'>
            We only use organic cotton which not only saves water, it&apos;s
            never grown with any pesticides, herbicides or insecticides.
          </div>
        </div>
        <div
          className='material-img'
          style={{
            backgroundImage: 'url(/images/materials-photo/cotton5.webp)'
          }}
        >
          <div className='cotton-description'>
            We only use organic cotton which not only saves water, it&apos;s
            never grown with any pesticides, herbicides or insecticides.
          </div>
        </div>
        <div
          className='material-img'
          style={{
            backgroundImage: 'url(/images/materials-photo/cotton3.webp)'
          }}
        >
          <div className='cotton-description'>
            We only use organic cotton which not only saves water, it&apos;s
            never grown with any pesticides, herbicides or insecticides.
          </div>
        </div>
      </div>

      <div className='material-title'>
        <h2 className='materials-h2'>
          JUTE{' '}
          <img width='35px' src='../images/materials/jute.svg' alt='jute' />
        </h2>
        <p className='materials-h3'>IT GROWN IN THE BENGAL AREA</p>
      </div>
      <div
        className='hemp-img'
        style={{ backgroundImage: 'url(/images/materials-photo/jute2.webp)' }}
      >
        <div className='hemp-description'>
          <p className='hemp-p'>
            Natural jute fabric is one of the most useful materials in the world
            after cotton.{' '}
          </p>
          <p className='hemp-p'>
            <span className='bold-text'> 85%</span>
            <br /> of the world’s jute production is concentrated in the Ganges
            Delta
          </p>
          <p className='hemp-p'>
            It is also extremely affordable and is considered a very
            eco-friendly material. <br /> The plants from which it is made are
            naturally occurring in the fertile areas along the Ganges.
          </p>
        </div>
      </div>

      <div className='material-title'>
        <h2 className='materials-h2'>
          WOOL{' '}
          <img width='35px' src='../images/materials/wool.svg' alt='wool' />
        </h2>
        <p className='materials-h3'>
          FROM FARMS WITH ANIMAL WELFARE CERTIFICATION
        </p>
      </div>

      <div className='wool-bottom'>
        <div
          className='material-img'
          style={{ backgroundImage: 'url(/images/materials-photo/wool.webp)' }}
        />
        <h2 className='materials-h2'>
          Highly sustainable and biodegradable, wool is one of the most
          recyclable fibers. We use recycled wool and Merino wool from mills in
          Italy and Australia.
        </h2>
        <div
          className='material-img'
          style={{ backgroundImage: 'url(/images/materials-photo/wool3.webp)' }}
        />
      </div>

      <div className='material-title'>
        <h2 className='materials-h2'>
          HEMP{' '}
          <img width='35px' src='../images/materials/ramie.svg' alt='ramie' />
        </h2>
        <p className='materials-h3'>THE NATURAL AMONG THE FABRICS</p>
      </div>

      <div>
        <div
          className='hemp-img'
          style={{ backgroundImage: 'url(/images/materials-photo/hemp4.webp)' }}
        >
          <div className='hemp-description'>
            <p className='hemp-p'>
              Hemp has been used to make fabric for thousands of years.
              It&apos;s one of the most sustainable fibres in the world, and an
              excellent alternative to linen. We’ve been using hemp in our
              collections since 1995.
            </p>
            <p className='hemp-p'>
              Up to <span className='bold-text'>50,000</span>
              <br /> different products can currently be made with hemp.
            </p>
            <p className='hemp-p'>
              WE USE HEMP THROUGHOUT OUR COLLECTIONS. ITS ADAPTABILITY MEANS
              IT&apos;S EASY TO BLEND WITH OTHER FIBRES TO CREATE DIFFERENT
              FABRIC WEIGHTS – FOR WARMER OR COOLER CLOTHING.
            </p>
          </div>
        </div>
      </div>

      <div className='material-title'>
        <h2 className='materials-h2'>
          SILK{' '}
          <img width='35px' src='../images/materials/silk.svg' alt='silk' />
        </h2>
        <p className='materials-h3'>PRODUCED IN GOTS-CERTIFIED FACTORIES</p>
      </div>
      <div className='silk-images'>
        <div
          className='material-img'
          style={{ backgroundImage: 'url(/images/materials-photo/silk4.webp)' }}
        >
          <div className='cotton-description'>
            {' '}
            As silk is extremely breathable and can regulate temperature very
            well, it can also keep you warm when the air is cold.{' '}
          </div>
        </div>
        <div
          className='material-img'
          style={{ backgroundImage: 'url(/images/materials-photo/silk3.webp)' }}
        >
          <div className='cotton-description'>
            Silk is not in endless supply and it is still extremely complicated
            to produce.{' '}
          </div>
        </div>
        <div
          className='material-img'
          style={{ backgroundImage: 'url(/images/materials-photo/silk6.webp)' }}
        >
          <div className='cotton-description'>
            Silk is firm and elastic at the same time.
          </div>
        </div>
      </div>

      <div className='material-title recycled'>
        <h2 className='materials-h2'>
          RECYCLED POLYESTER{' '}
          <img
            width='35px'
            src='../images/materials/recycled.svg'
            alt='recycled'
          />
        </h2>
        <p className='materials-h3'>
          IT IS MADE ENTIRELY FROM USED PLASTIC BOTTLES
        </p>
      </div>
      <div
        className='recycled-images'
        style={{
          backgroundImage: 'url(/images/materials-photo/recycled1.webp)'
        }}
      >
        <div className='recycled-img'>
          <p className='recycled-p'>
            RECYCLING PLASTIC BOTTLES REDUCES WASTE GOING TO LANDFILL
          </p>
        </div>
        <div className='recycled-img'>
          <p className='recycled-p'>
            USES 33-53% LESS ENERGY IN PRODUCTION THAN VIRGIN POLYESTER
          </p>
        </div>
        <div className='recycled-img'>
          <p className='recycled-p'>ELIMINATES THE NEED FOR PETROLEUM</p>
        </div>
        <div className='recycled-img'>
          <p className='recycled-p'>
            60 MILLION PLASTIC BOTTLES GO TO WASTE EVERY DAY GLOBALLY
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default StaticMaterialsContent;
