import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import Swal from 'sweetalert2';


export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: null,
        authErrors: [],
        authShowFormCreateUser: true,
        authShowFormSendCode: false,
        authShowFormValidateCode: false,
        authReferenceOtpCode: null
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
        showFormCreateUser: (state) => state.authShowFormCreateUser,
        showFormSendCode: (state) => state.authShowFormSendCode,
        showFormValidateCode: (state) => state.authShowFormValidateCode,
        referenceOtpCode: (state) => state.authReferenceOtpCode
    },
    actions: {
        async getToken() {
            await axios.get("/sanctum/csrf-cookie");
        },
        async getUser() {
            this.getToken();
            const data = await axios.get("/api/user");
            this.authUser = data.data;
        },
        async handleLogin( data ) {
            this.authErrors = [];
            await this.getToken();
            const token = Cookies.get('XSRF-TOKEN')
            const headers = {
              'X-XSRF-TOKEN': `${token}`,
            };
            const formData = {
              email: data.email,
              password: data.password
            };
            
            try {
                await axios.post("/login", formData, {headers: headers});
                this.router.push("/");
            } catch (error) {
                console.error(error);
            //    if(error.response.status === 422){
            //         this.authErrors = error.response.data.errors;
            //         console.log(this.authErrors);
            //    }
            }
        },
        async handleRegister( data ) {
            this.authErrors = [];
            await this.getToken();
            const token = Cookies.get('XSRF-TOKEN')
            const headers = {
              'X-XSRF-TOKEN': `${token}`,
            };

            const formData = {
              name: data.name,
              email: data.email,
              phone: data.phone,
              password: data.password,
              password_confirmation: data.password_confirmation
            }
            
            try {

                await axios.post("/register", formData, { headers: headers });

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your information has been saved",
                    text: "Now we will validate your identity and will an OTP code",
                    showConfirmButton: false,
                    timer: 4000
                }).then(( result ) => {
                    if(result.dismiss) {
                        this.authShowFormCreateUser = false;
                        this.authShowFormSendCode = true;
                    }
                });

            } catch (error) {
                let msj = "";
                if(error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                    msj = "There are fields empties, please fill all fields!";
                    console.log(this.authErrors);
                } else {
                    msj = "Something went wrong!";
                }
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: msj
                });
            }
        },
        async handleLogout() {
            await this.getToken();
            const token = Cookies.get('XSRF-TOKEN')
            const headers = {
              'X-XSRF-TOKEN': `${token}`,
            }
            await axios.post("/logout",{}, {headers: headers});
            this.authUser = null;
        },
        async handleSendCode(form) {
            await this.getToken();
            const token = Cookies.get('XSRF-TOKEN')
            const headers = {
              'X-XSRF-TOKEN': `${token}`,
            }

            try {
                const response = await axios.post("/api/sendOtp",{"phone_number": form.phone_to_validate}, {headers});
                const { errors, reference_id } = response.data;
                
                if(errors.length === 0) {

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "OTP Code was sent successfully",
                        showConfirmButton: false,
                        timer: 4000
                    }).then(( result ) => {
                        if(result.dismiss) {
                            this.authShowFormSendCode = false;
                            this.authShowFormValidateCode = true;
                            this.authReferenceOtpCode = reference_id
                        }
                    });
                    
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!"
                    });
                }
                
            } catch (error) {
                console.error('Error', error);
            }

        },
        async handleValidateCode(form) {
            
            const reference_id = this.referenceOtpCode;
            const otp_code = form.code_otp;
            try {
                const response = await axios.get(`/api/validateOtp/${reference_id}/${otp_code}`);
                const { isValid } = response.data;

                if(isValid) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "OTP Code was validate successfully",
                        showConfirmButton: false,
                        timer: 4000
                    }).then(( result ) => {
                        if(result.dismiss) {
                            this.router.push("/login");
                        }
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "OTP Code was not validate successfully",
                        showConfirmButton: false,
                        timer: 4000
                    }).then(( result ) => {
                        if(result.dismiss) {
                            this.authShowFormValidateCode = false;
                            this.authShowFormSendCode = true;
                        }
                    });
                    
                }

            } catch (error) {
                console.error(error);                
            }
            
        }
    }
})