import { toast } from "react-toastify";
import moment from "jalali-moment"

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const isoDateWithoutTimeToJalaliDate = (isoDate) => {
    const justDate = isoDate.split("T")[0]
    const date = new Date(justDate);
    
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const finalDate = `${year}/${month}/${day}`;

    const jalaliDate = moment(finalDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    return jalaliDate;
}

export const planTypesValidation = (typeObj ) => {

    const {amount ,period ,discount} = typeObj

    if(amount.length === 0){
         toast.error('مبلغ را وارد نمایید')
        return false
    }
    if(!parseInt(amount) === NaN || parseInt(amount) < 0){
         toast.error("مبلغ باید یک عدد مثبت باشد")
        return false
    }

    if(period.length === 0) {
         toast.error('مدت زمان را وارد نمایید')
        return false
    }
    if(parseInt(period) === NaN || parseInt(period) < 0){
         toast.error("مدت زمان باید یک عدد مثبت باشد")
        return false
    }

    if(discount.length === 0) {
         toast.error('تخفیف را وارد نمایید')
        return false
    }
    if(parseInt(discount) === NaN || parseInt(discount) < 0){
        console.log(parseInt(discount));
         toast.error(" تخفیف باید یک عدد مثبت باشد")
         return false
    }

    return true
}

export const convertToGorgeousDate = (date) => {
    moment.locale('fa', { useGregorianParser: true });  
    const gorgeousDate = moment(date).format("yyyy/M/D");
    return gorgeousDate
}

export const isoDateToJalaliDate = (isoDate) => {
    moment.locale('fa' ,{useGregorianParser:true})
    return moment(isoDate).format('YYYY/MM/DD HH:MM:ss')
}

export const convertAgeValueToPersion = (value) => {
    if(value === "less than 30") return "کمتر از 30 سال";
    if(value === "between 30 and 40") return "بین 30 سال تا 40 سال";
    if(value === "more than 40") return "بیشتر از 40 سال";
}

export const convertQuantityValueToPersion = (value) => {
    if(value === "less than 100 million toman") return "کمتر از 100 میلیون تومان";
    if(value === "between 100 and 500 million toman") return "بین 100 و 500 میلیون تومان";
    if(value === "more than 500 million toman") return "بیشتر از 500 میلیون تومان";
}

export const convertTermValueToPersion = (value) => {
    if(value === "short term") return "کوتاه مدت";
    if(value === "mid term") return "میان مدت";
    if(value === "long term") return "بلند مدت";
}