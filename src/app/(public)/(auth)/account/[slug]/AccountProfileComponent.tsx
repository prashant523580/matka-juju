import FormGroup, { FormLabel, InputControl } from '@/components/ui/Card/Form';
import { getUserById } from '@/controllers/user';
import { useSession } from 'next-auth/react';
import { notFound } from 'next/navigation';
import React from 'react'

function AccountProfileComponent({ slug }: { slug: any }) {
    // let user = await getUserById(slug);
    const session = useSession();
    const [isEdit, setIsEdit] = React.useState(false);
    const [user, setUser] = React.useState<any>({
        name: session?.data?.user?.name,
        email: session?.data?.user?.email,
        newPassword: "",
        conformNewPassword: ""
    })
    // if(!user) notFound()
    const handleInputChange = (e: any) => {

    }
    return (
        <div>

            {
                isEdit === false ? <div className="bg-gray-200 p-4">
                    <p> {session.data?.user?.name} </p>
                    <p>{session?.data?.user?.email}</p>
                    <button onClick={() => setIsEdit(true)}>Edit Profile</button>
                </div> :
                    <div className='py-4 px-6 bg-gray-200'>
                        <div className="flex justify-between">
                            <h2>Edit profile</h2>
                            <button onClick={() => setIsEdit(false)}>cancel</button>
                        </div>
                        <div className="form max-w-md mx-auto">
                            <FormGroup>
                                <FormLabel title='name' />
                                <InputControl
                                    type='text'
                                    name="name"
                                    onChange={handleInputChange}
                                    value={user.name}
                                    placeholder='Name'
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel title='email' />
                                <InputControl
                                    type='email'
                                    name="email"
                                    onChange={handleInputChange}
                                    value={user.email}
                                    placeholder='email'
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel title='new password' />
                                <InputControl
                                    type='password'
                                    name="newPassword"
                                    onChange={handleInputChange}
                                    value={user.newPassword}
                                    placeholder='New Password'
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel title='Confirm New Password' />
                                <InputControl
                                    type='text'
                                    name="confirmNewPassword"
                                    onChange={handleInputChange}
                                    value={user.confirmNewPassword}
                                    placeholder='Confirm New Password'
                                />
                            </FormGroup>
                        </div>
                    </div>
            }
        </div>
    )
}

export default AccountProfileComponent