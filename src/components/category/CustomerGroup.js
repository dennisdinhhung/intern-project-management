import React from 'react'
import '../../static/css/OutletCommonChild.scss'

function CustomerGroup() {
  return (
    <div className='CustomerGroup Common'>
      <div className="title">
            Customer Group
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

export default CustomerGroup