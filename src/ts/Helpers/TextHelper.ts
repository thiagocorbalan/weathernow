export abstract class TextHelper{

    public static normalize(str) {

        const withAccent = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        const withoutAccent = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
        let oldStr = str.replace(/\s+/g,'').toLowerCase();
        let newStr = "";

        for(let i=0,iLen = oldStr.length ; i< iLen; i++) {
            let change = false;
            for (let a=0, aLen = withAccent.length; a < aLen; a++) {
                if (oldStr.substr(i,1) == withAccent.substr(a,1) ) {
                    newStr += withoutAccent.substr(a,1);
                    change = true;
                    break;
                }
            }
            if (change == false) {
                newStr += oldStr.substr(i,1);
            }
        }
        return newStr;
    }
}