import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function WithGoogle() {
    return (
        <GoogleOAuthProvider clientId="638868537079-b20i3m0kn0f6220o1vu2q8odh00shffr.apps.googleusercontent.com">
            <div>
                <h1>Google orqali Kirish</h1>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log("Google Login Success:", credentialResponse);
                        // Token ni backendga yuborish mumkin
                    }}
                    onError={() => {
                        console.log("Google Login Failed");
                    }}
                />
            </div>
        </GoogleOAuthProvider>
    );
}

export default WithGoogle;