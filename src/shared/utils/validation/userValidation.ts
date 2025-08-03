const userValidation = {
    validateEmail: (email: string): boolean => {
        const emailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return emailRegex.test(email);
    },
    //Rules: min 8
    validatePassword: (password: string): boolean => {
        const minLength = 8;
        return password.length >= minLength;
    },
    //Rules: min 3
    validateName: (name: string): boolean => {
        const minLength = 3;
        return name.trim().length >= minLength;
    },
    // should be number and length should be 10
    validatePhone: (phone: string): boolean => {
        const length = 10;
        const digitsOnlyRegex = /^\d+$/;
        const trimmedPhone = phone.trim();
        return trimmedPhone.length === length && digitsOnlyRegex.test(trimmedPhone);
    }
};

export default userValidation;