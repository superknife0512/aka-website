
const app = new Vue({
    el: '#signup',
    data:{
        email:'',
        canUse: null,
        pass:'',
        cfPass: '',
        passCheck: null,
        sameCheck: null,
        role: 'admin',
        roleCode: '',
        codeInfo: '',
        popupActive: false,
    },
    methods:{
        checkEmail(){
            // the method that check email asyncschronously
            fetch('/teacher/email-check',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: this.email})

            }).then(res=>{
                return res.json()
            }).then(data=>{
                this.canUse = data.canUse
                console.log(data);
            })
            .catch(err=>{
                console.log(err);
            })
        },

        getCode(){
            // this method will trigger server send a code to a secret email
            fetch('/teacher/send-code',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({role: this.role})
            }).then(response=>{
                this.popupActive = true;
                return response.json();
            }).then(data=>{
                console.log(data);
            }).catch(err=>{
                console.log(err);
            })
        },

        checkRoleCode(){
            fetch('/teacher/code-check',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code: this.roleCode}),
            }).then(res=>{
                return res.json()
            }).then(data=>{
                this.codeInfo = data.msg;
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    watch:{
        pass(value){
            if(value.length < 6){
                this.passCheck = false
            } else {
                this.passCheck = true
            }
        },

        cfPass(value){
            if(value !== this.pass){
                this.sameCheck = false
            } else {
                this.sameCheck = true
            }
        }
    },
    computed:{
        basicFill(){
            return this.email !== '' && this.pass !== '' && this.cfPass !==''
        }
    }
})