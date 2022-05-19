export default function Validate(obj){
    console.log(obj, 0)

    let error = {
        // name: '',
        // description: '',
        // priority: '',
        // status: '',

        // function: '',
        // personal_info: {
        //     name: '',
        //     dob: '',
        //     phone: ''
        // },

        // employee: '',
        // techstack: '',
        // techstack_info: '',

        // type: '',
        // department: '',
        // members: '',
        // customer: ''
    };
    
    if (obj.personal_info){
        error = {
            personal_info: {
                name: '',
                dob: '',
                phone: ''
            }
        }
    }


    //* NAME
    if (obj.name !== undefined){
        error.name = Validate.isRequired(obj.name, 'Please enter the name.');
    }

    //* personal info name
    if (obj.personal_info?.name !== undefined){
        error.personal_info.name = Validate.isRequired(obj.personal_info?.name, 'Please enter the name.');
        if (obj.personal_info?.name !== ''){
            error.personal_info.name = Validate.isName(obj.personal_info?.name);
        }
    }

    //* DESC
    if (obj.description !== undefined){
        error.description = Validate.isRequired(obj.description, 'Please enter the description.')
    }

    //* priority
    if (obj.priority !== undefined){
        error.priority = Validate.isRequired(obj.priority, 'Please enter the priority number.')
    }

    //* FUNCTION
    if (obj.function !== undefined){
        error.function = Validate.isRequired(obj.function, 'Please enter the function.')
    }

    //* personal info phone
    if (obj.personal_info?.phone !== undefined){
        error.personal_info.phone = Validate.isRequired(obj.personal_info.phone, 'Please enter the phone number.');
        if (obj.personal_info.phone !== ''){
            error.personal_info.phone = Validate.isPhone(obj.personal_info.phone);
        }
    }

    //* STATUS
    if(obj.status !== undefined){
        error.status = Validate.isRequired(obj.status, 'Please choose an option.');
    }

    //* employee
    if(obj.employee !== undefined){
        error.employee = Validate.isRequired(obj.employee, 'Please choose an option')
    }

    //* tech stack
    if(obj.techstack !== undefined){
        error.techstack = Validate.isRequired(obj.techstack, 'Please choose an option')
    }

    //* tech stack
    if(obj.techstack_info !== undefined){
        error.techstack_info = Validate.isRequired(obj.techstack_info, 'Please choose an option')
    }

    //* personal info dob
    if(obj.personal_info?.dob !== undefined){
        error.personal_info.dob = Validate.isRequired(obj.personal_info.dob, 'Please choose a date of birth.')
        if (obj.personal_info.dob !== ''){
            error.personal_info.dob = Validate.isDate(obj.personal_info.dob);
        }
    }

    //* type
    if(obj.type !== undefined){
        error.type = Validate.isRequired(obj.type, 'Please choose an option')
    }

    //* department
    if(obj.department !== undefined){
        error.department = Validate.isRequired(obj.department, 'Please choose an option')
    }

    //* members
    if(obj.members !== undefined){
        error.members = Validate.isRequired(obj.members, 'Please choose an option')
    }

    //* customer
    if(obj.customer !== undefined){
        error.customer = Validate.isRequired(obj.customer, 'Please choose an option')
    }

    //! preventative bug fixing
    if (error.personal_info?.name === null && error.personal_info?.dob === null && error.personal_info?.phone === null){
        error.personal_info = null

        console.log(error.personal_info, 'test')
    }
    
    console.log(obj, 'obj')
    console.log(error, 'error')

    return error;
}

Validate.isRequired = (value, msg) => {

    if (Array.isArray(value)){
        return value.length !== 0 ? null : msg
    }

    return value.trim() !== '' ? null : msg

}

Validate.isName = (value, msg) => {
    const regex = /[A-Za-z]+((\s)?(('|-|\.)?([A-Za-z])+))*$/;
    return regex.test(value) ? null : (msg || "Name can't have numbers.")
}

Validate.isPhone = (value, msg) => {
    const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return regex.test(value) ? null : (msg || 'Please enter the correct phone number.')
}

Validate.isDate = (value, message) => {
    const regex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    return regex.test(value) ? null : (message || 'Please choose the correct date format');
}

Validate.isPriority =  () => {

}