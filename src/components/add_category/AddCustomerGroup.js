import React from 'react'

function AddCustomerGroup() {
  return (
    <div className='AddCustomerGroup Common'>
        <div className="title">
            Add Customer Group
        </div>

        <form action="">
            <div>Name</div>
            <input type="text" />

            <div>Description</div>
            <input type="text" />

            <div>Priority Number</div>
            <input type="text" />

            <div>Status</div>
            <select name="" id="">
                <option value="active">ACTIVE</option>
                <option value="inactive">INACTIVE</option>
            </select>

            <button className='btn-add-prj'>
                Add
            </button>
        </form>
    </div>
  )
}

export default AddCustomerGroup