import {effect, signal} from "@preact/signals-react";


export const jwtToken = signal(getToken());

function getToken(){
    const tokeni = sessionStorage.getItem('token');
    return tokeni == null || tokeni == 'null' ? '' : tokeni;

}

effect(()=>{

    sessionStorage.setItem('token', jwtToken.value)
});
export function logout(){
    jwtToken.value = '';
}