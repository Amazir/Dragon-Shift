function showCookie(name) 
{
    if (document.cookie!="") 
    { 
        var cookies=document.cookie.split("; "); 
        for (var i=0; i<cookies.length; i++) 
        { 
            var cookieName=cookies[i].split("=")[0];
            var cookieVal=cookies[i].split("=")[1];
            if (cookieName===name)
                return decodeURI(cookieVal) 
        }
    }
}

function deleteCookie(name) 
{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setCookie(name, val, days) 
{
    if (days) 
    {
        var data = new Date();
        data.setTime(data.getTime() + (days * 24*60*60*1000));
        var expires = "; expires="+data.toGMTString();
    } 
    else 
        var expires = "";
    document.cookie = name + "=" + val + expires + "; path:3000=/game";
}