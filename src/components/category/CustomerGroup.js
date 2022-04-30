import React from 'react'
import '../../static/css/OutletCommonChild.scss'
import {useNavigate} from 'react-router-dom'

function CustomerGroup() {
    
    const redirect = useNavigate();

  return (
    <div className='CustomerGroup Common'>
      <div className="title">
            Customer Group
        </div>

        <button
            className='btn-add'
            onClick={() => {
                redirect('add')
            }}>
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