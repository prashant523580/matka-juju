// import { Chip, ListItem, Paper, styled } from '@mui/material';
import React from 'react'
// const ListItem = styled('li')(({ theme }) => ({
//     margin: theme.spacing(0.5),
// }));
function KeywordTags({ tags, setTags }: { tags: any[], setTags: any }) {
    // const [tags, setTags] = React.useState<any>([]);
    const [tagText, setTagText] = React.useState<any>(tags);
    const handleDeleteTag = (chipToDelete: any) => () => {
        let updatedTag = [...tags];
        updatedTag.splice(chipToDelete, 1)
        //   setTags((tags: any[]) => tags.filter((chip) => chip !== chipToDelete));
        //   let delTag = tags;
        setTags(updatedTag)
        setTagText(updatedTag)
    };
    const handleTags = (e: any) => {
        // console.log(e.target.value)
        const inputText = e.target.value
        setTagText(e.target.value)
        let newTags = inputText.split(',').map((tag: string) => tag.trim());
        // console.log(newTags)
        setTags(newTags)
        // setTags(tags)
    }
    React.useEffect(()=>{

        console.log(tags)
    },[tags])

    return (
        <div>
            <input id='tags' type="text" onChange={handleTags} value={tagText} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" />
            <div
                className='flex flex-wrap justify-center '
            >
                {tags.map((data: any, ind: number) => {
                    let icon;



                    return (
                        <div key={data} >

                            <div onClick={handleDeleteTag(ind)}>
                                {data}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default KeywordTags