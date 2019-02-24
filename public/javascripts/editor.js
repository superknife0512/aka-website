const app = new Vue({
    el: '#createPost',
    data:{
        transData: '',
        delta: null,
        deltaEdit: '',
    },
    created(){
        setTimeout(() => {
            this.deltaEdit = this.$refs.deltaEdit.value;
            this.setData();
        }, 500);
    },
    methods:{
        onSubmit(){
            console.log('cax');
        },
        translate(){
            this.transData = quill.root.innerHTML;
            this.delta = JSON.stringify(quill.getContents());
            console.log(JSON.stringify(this.delta));
        },
        setData(){
            quill.setContents(JSON.parse(this.deltaEdit));
        }
    }
})

const toobarOption = [
    ['bold', 'italic', 'underline', 'strike', 'link'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']     
];
const quill = new Quill('#editor',{
    debug: 'info',
    modules: {
      toolbar: toobarOption
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
})


