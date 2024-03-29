import React from 'react'
interface Field {
    key: string;
    value: string;
  }
  
  interface Item {
    heading: string;
    fields: Field[];
  }

function CustomSpecification() {

    const [Specifications, setSpecifications] = React.useState<Item[]>([]);
    const [newItemHeading, setNewItemHeading] = React.useState('');
    const handleAddItem = () => {
        setSpecifications([...Specifications, { heading: newItemHeading, fields: [] }]);
        setNewItemHeading('');
      };
    
      const handleAddField = (itemIndex: number) => {
        const SpecificationsCopy = [...Specifications];
        SpecificationsCopy[itemIndex].fields.push({ key: '', value: '' });
        setSpecifications(SpecificationsCopy);
      };
    
      const handleRemoveField = (itemIndex: number, fieldIndex: number) => {
        const SpecificationsCopy = [...Specifications];
        SpecificationsCopy[itemIndex].fields.splice(fieldIndex, 1);
        setSpecifications(SpecificationsCopy);
      };
    
      const handleRemoveItem = (itemIndex: number) => {
        const SpecificationsCopy = [...Specifications];
        SpecificationsCopy.splice(itemIndex, 1);
        setSpecifications(SpecificationsCopy);
      };
    
      const handleHeadingChange = (itemIndex: number, newHeading: string) => {
        const SpecificationsCopy = [...Specifications];
        SpecificationsCopy[itemIndex].heading = newHeading;
        setSpecifications(SpecificationsCopy);
      };
    
      const handleFieldChange = (itemIndex: number, fieldIndex: number, newKey: string, newValue: string) => {
        const SpecificationsCopy = [...Specifications];
        SpecificationsCopy[itemIndex].fields[fieldIndex].key = newKey;
        SpecificationsCopy[itemIndex].fields[fieldIndex].value = newValue;
        setSpecifications(SpecificationsCopy);
      };
  return (
    <div className=''>
    <label className='font-bold text-md capitalize' htmlFor="specifications">Specifications</label>
    <div className=' mt-1 border-2 py-1'>
        <div className=' px-2 py-2 mx-2'>
            {
                Specifications.map((item: any, itemIndex: any) => (
                    <div key={itemIndex} className='my-2 max-w-screen-sm  '>
                        <div className='flex bg-gray-300'>


                            <div className="w-full ">
                                <input
                                    type="text"
                                    placeholder="Enter heading"
                                    value={item.heading}
                                    className="font-bold text-lg flex-1 p-2 w-full bg-inherit "
                                    onChange={e => handleHeadingChange(itemIndex, e.target.value)}
                                />
                            </div>

                            <button type='button' className="text-gray-500 hover:text-gray-700" onClick={() => handleRemoveItem(itemIndex)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            </button>
                        </div>
                        <div className='py-2'>
                            {item.fields.map((field: any, fieldIndex: any) => (
                                <div key={fieldIndex} className="flex items-center  space-x-2 px-2">
                                    <div className='w-full border-l'>

                                        <input
                                            type="text"
                                            placeholder="Enter key"
                                            value={field.key}
                                            className="flex-1 outline-none p-1 w-full"
                                            onChange={e => handleFieldChange(itemIndex, fieldIndex, e.target.value, field.value)}
                                        />
                                    </div>
                                    <div className='w-full border-l'>

                                        <input
                                            type="text"
                                            placeholder="Enter value"
                                            value={field.value}
                                            className="flex-1 outline-none p-1  w-full"
                                            onChange={e => handleFieldChange(itemIndex, fieldIndex, field.key, e.target.value)}
                                        />
                                    </div>


                                    <button type='button' className="text-red-500 hover:text-red-700" onClick={() => handleRemoveField(itemIndex, fieldIndex)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>

                                    </button>

                                </div>
                            ))}
                            <div className='border-spacing-y-3'>
                                <div>

                                    <button type='button' className="bg-green-500 px-1 py-2 text-white hover:bg-green-700" onClick={() => handleAddField(itemIndex)}>
                                        Add Field
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }
        </div>
        <div className='my-2'>
            <input
                type="text"
                placeholder="Enter heading for new item"
                value={newItemHeading}
                onChange={e => setNewItemHeading(e.target.value)}
                className='bg-gray-300 outline-none py-2 px-1'
            />
            <button type="button" className="text-green-500 hover:text-green-700 ml-2" onClick={handleAddItem}>
                Add Item
            </button>
        </div>
    </div>
</div>
  )
}

export default CustomSpecification