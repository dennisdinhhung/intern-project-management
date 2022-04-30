import React from 'react'
import '../../static/css/OutletCommonChild.scss'

function PrjStatus() {
  return (
    <div className='ProjectStatus Common'>
      <div className="title">
        Project Status
      </div>

      <button className='btn-add'>
            Add
        </button>

        <table className='table'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {/* map this */}
            </tbody>
        </table>
    </div>
  )
}

export default PrjStatus