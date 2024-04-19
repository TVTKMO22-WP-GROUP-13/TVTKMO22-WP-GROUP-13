import { jwtToken } from "../components/AuSignal";
import axios from 'axios';


export const isLoggedIN = () => {
    console.log("Toimii")
    return jwtToken.value.length === 0 ? null : jwtToken.value
}


const getUserOwnGroups = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${jwtToken.value}`
        } 
        }) 
        console.log("Oisko gruuppeja?", response.data)
        if (response.data.groups?.length > 0) {
            const OwnGroups = response.data.groups
            console.log("Omat gruupit", OwnGroups)
            return OwnGroups;
        } else {
            console.log("Ei toiminnu")
        }
    } catch (error) {
        console.log("Ei ees sinne päinkää", error)
    }
}
export const fetchTheFknGroups = async () => {
    
        if(jwtToken.value) {
            const OwnGroups = await getUserOwnGroups('http://localhost:3001/user_group/getUserCreatedGroups')
            console.log("Omat gruupit pliiiiiiiis", OwnGroups)
            return OwnGroups;
        } else {
            new Error ('Ei vitus')
        }
    
}

/*const getUserGroups = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${jwtToken.value}` }
        });
        console.log("Received groups:", response.data);
        const groupsData = response.data.groups || [];
        console.log("Parsed groups data:", groupsData);
        return groupsData;
    } catch (error) {
        console.error("Error fetching groups:", error);
        return []; // Return an empty array in case of error
    }
};

export const fetchTheFknGroups = async () => {
    try {
        if (!jwtToken.value) {
            throw new Error('Token not found');
        }

        const ownGroups = await getUserGroups('http://localhost:3001/user_group/getUserCreatedGroups');
        const joinedGroups = await getUserGroups('http://localhost:3001/group_member/groups_joined');

        console.log("Own groups:", ownGroups);
        console.log("Joined groups:", joinedGroups);

        // You can return both sets of groups as needed
        return { ownGroups, joinedGroups };
    } catch (error) {
        console.error("Error fetching groups:", error);
        throw new Error('Failed to retrieve groups');
    }
};*/
