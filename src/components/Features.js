import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const FeatureGrid = ({ gridItems }) => (
  <div className="grid grid-cols-4 gap-5">
    {gridItems.map((item) => (
      <div key={item.text} className="p-3 bg-gray-100 shadow-lg">
        <section className="section">
          <div className="flex items-center justify-center p-12 opacity-40">
            <div
              style={{
                width: '140px',
                display: 'inline-block',
              }}
            >
              <PreviewCompatibleImage imageInfo={item} />
            </div>
          </div>
          <p className="font-sans text-base font-bold">{item.text}</p>
        </section>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
}

export default FeatureGrid
