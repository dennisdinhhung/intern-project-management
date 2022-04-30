import React from 'react'
import {useNavigate} from 'react-router-dom'

import '../../static/css/OutletCommonChild.scss'

function PrjType() {

    const redirect = useNavigate();

    return (
        <div className='ProjectType Common'>
            <div className="title">
                Project Type
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

export default PrjType