
import React from 'react'
// const ListItem = styled('li')(({ theme }) => ({
//     margin: theme.spacing(0.5),
// }));
function TextareaComponent({value,setValue,name, placeholder} : {name:string,value:any[],setValue:any, placeholder?: string}) {
    // const [value, setValues] = React.useState<any>([]);
    const [tagText, setTagText] = React.useState<any>(typeof value == "object" ? value.join("\n") : value );
    // const handleDeleteTag = (chipToDelete: any) => () => {
    //     let updatedTag = [...value];
    //     updatedTag.splice(chipToDelete, 1)
    //     //   setValues((value: any[]) => value.filter((chip) => chip !== chipToDelete));
    //     //   let delTag = value;
    //     setValue(updatedTag)
    //     setTagText(updatedTag)
    // };
    const handleValue = (e: any) => {
        console.log(e.target.value)
        const inputText = e.target.value
        setTagText(e.target.value)
        let newvalue = inputText.split('\n').map((tag: string) => tag.trim());
        // console.log(newTags)
        setValue(newvalue)
        // setValues(tags)
    }

  return (
    <div>
          <textarea id={name} rows={4} onChange={handleValue} value={tagText} className="w-full px-3 py-2 border bg-white text-black border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
          placeholder={placeholder}
          />
                        {/* <Paper
                            sx={{

                                listStyle: 'none',
                                p: 0.5,
                                m: 0,
                            }}
                            component="ul"
                            className='flex flex-col justify-start '
                        >
                            {value && value.map((data: any, ind: number) => {
                                let icon;



                                return (
                                    <ListItem key={data} sx={{ width: "auto",whiteSpace:"wrap" }}>
                                        <Chip
                                            sx={{
                                                whiteSpace:"wrap"
                                            }}
                                            icon={icon}
                                            label={data}
                                            onDelete={handleDeleteTag(ind)}
                                        />
                                    </ListItem>
                                );
                            })}
                        </Paper> */}
    </div>
  )
}

export default TextareaComponent