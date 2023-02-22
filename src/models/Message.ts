import {v4} from 'uuid';

export default interface MessageInterface {
    id : string, //=>خیلی از جاها میتوان از 
    // typeof
    // برای استفاده از تایپ چیزی گه نمیدونیم تایپش چیه
    text : string,
    senderId : string,
    date : string,
    img ?: string 
}