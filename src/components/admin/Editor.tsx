"use client"
import dynamic from 'next/dynamic';
// import { ReactQuillProps } from 'react-quill';
// import ReactQuill from 'react-quill';
// type ReactQuillProps ={
//   value: any
//   onChange: any
//   modules: any
//   formats: any
//   placeholder:any
// }
const ReactQuillNoSSR : any = dynamic( () => import("react-quill"),{
  ssr:false,
  loading : () => <p>loading...</p>
})
import 'react-quill/dist/quill.snow.css';
interface IProps  {
    editorValue : any,
    setEditorValue: any
}
const Editor = ({ editorValue, setEditorValue }: IProps) => {
const onEditorChange = (value:any) => {
    console.log(value)
    setEditorValue(value)
}
  const modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: [1, 2, 3, 4, 5, 6,false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['youtube', 'blockquote', 'code-block'],
        [{ clean: 'remove-format' }],
      ],
      clipboard: {
        matchVisual: false,
      },
    };

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'header',
    'list',
    'script',
    'indent',
    'direction',
    'size',
    'color',
    'background',
    'font',
    'align',
    'link',
    'image',
    'video',
    'youtube',
    'blockquote',
    'code-block',
    'clean',
  ];

 
  return (
 
  <ReactQuillNoSSR
    value={editorValue}
    onChange={onEditorChange}
    modules={modules}
    formats={formats}
    className={"dark:text-white  text-black dark:placeholder:text-gray placeholder:text-gray overflow-y-auto"}
    placeholder="Type something here..."
    theme="snow"
  />
  )
};



export default Editor;
