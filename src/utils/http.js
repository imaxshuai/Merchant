let localhost = 'http://crm.parse.cn/api/';

export const Http = {
    get: (url, params, headers) => {

        url = localhost+url;
        if (params) {
            let paramsArray = [];
            //过去params苏偶偶的KEY
            let paramsKeyArray = Object.keys(params);
            // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
            paramsKeyArray.forEach(key => {
                return paramsArray.push((key + '=' + params[key]));
            });

            //网络拼接
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += paramsArray.join('&');
            }
        }

        return new Promise(function (resolve, reject) {

            // console.log('请求地址：--------------------------');
            console.log(url);
            fetch(url, {
                method: 'GET',
                headers: headers
            })
                .then((response) => response.json())
                .then((response) => resolve(response))
                .catch((error) => {
                    console.log(error);
                    alert('服务器连接出错');
                    reject({status: -1})
                })
                .done();
        })

    },

    post: (url, params, headers) => {

        if (params) {
            // 初始化FormData
            var formData = JSON.stringify(params);
        }


        return new Promise(function (resolve, reject) {

            console.log('请求地址：--------------------------');
            console.log(localhost+url);
            console.log(params);
            console.log(headers);

            fetch(localhost+url, {
                method: 'POST',
                headers: headers ? headers : {'Content-Type': 'application/json'},
                body: formData,
            })
                .then((response) => response.json())
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    alert('服务器连接出错。');
                    reject({status: -1})
                })
                .done();
        })

    }
}

