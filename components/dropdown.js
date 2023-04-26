import { Dropdown, Text, Button, Link } from '@nextui-org/react';
import { userService } from '../utils/services/user-service';
import { useRouter } from 'next/router';

export default function AccountMenu({ sessionData }){

    const router = useRouter();

    const onLogout = user => {
        return userService.logout(user)
               .then(() => {
                    router.push('/account/login');
               })
               .catch((err) => {
                    console.log(err);
               });
    }

    const onProfile = user => {
        router.push('/account/main');
    }

    const handleSelection = (e) => {
        const { currentKey } = e;
        if(currentKey === "logout"){
            onLogout(sessionData);
        }
        if(currentKey === "profile"){
            onProfile(sessionData);
        }
    }

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Text as='a'>{`${sessionData.firstName} ${sessionData.lastName[0]+'.'}`} </Text>
            </Dropdown.Trigger>
            <Dropdown.Menu 
                aria-label='user-action' 
                onSelectionChange={handleSelection} 
                selectionMode='single'
            >
                <Dropdown.Item key="profile">Profile</Dropdown.Item>
                <Dropdown.Item key="logout" color='error'>
                    Log Out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}