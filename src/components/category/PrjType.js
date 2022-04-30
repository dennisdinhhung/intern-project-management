import React from 'react'
import '../../static/css/OutletCommonChild.scss'

function PrjType() {
  return (
    <div className='ProjectType Common'>
        <div className="title">
            Project Type
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
                    <th>Priority</th>
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

export default PrjType