import {EEmailActions} from "../enum/email.enum";

export const allTemplates:{
    [key:string]:{subject:string,templateName:string}
}={
    [EEmailActions.WELCOME]:{
        subject:"WellCum to our clothes shop",
        templateName:"register"
    },
    [EEmailActions.FORGOT_PASSWORD]:{
        subject:"Oh no you forgot your password",
        templateName:"forgotPassword"
    },
    [EEmailActions.ACTIVATE]:{
        subject:"Activate your account",
        templateName:"activate"
    }

}