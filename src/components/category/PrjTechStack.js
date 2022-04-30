import React from 'react'
import '../../static/css/OutletCommonChild.scss'

function PrjTechStack() {
  return (
    <div className='ProjectTechStack Common'>
      <div className="title">
            Teck Stack
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

export default PrjTechStack