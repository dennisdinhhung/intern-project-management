import React from 'react'
import '../../static/css/OutletCommonChild.scss'
import {useNavigate} from 'react-router-dom'

function PrjTechStack() {
    const redirect = useNavigate();

    return (
        <div className='ProjectType Common'>
            <div className="title">
                Tech Stack
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