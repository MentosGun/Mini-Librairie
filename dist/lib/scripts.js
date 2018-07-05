(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config(baseUrl) {
        this.token = null;
        this.baseUrl = baseUrl;
    }
    return Config;
}());
exports.Config = Config;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());
exports.Message = Message;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = /** @class */ (function () {
    function Room() {
    }
    return Room;
}());
exports.Room = Room;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./entity/User");
exports.User = User_1.User;
var Room_1 = require("./entity/Room");
exports.Room = Room_1.Room;
var Message_1 = require("./entity/Message");
exports.Message = Message_1.Message;
var UserRepository_1 = require("./repository/UserRepository");
exports.UserRepository = UserRepository_1.UserRepository;
var Config_1 = require("./Config");
exports.Config = Config_1.Config;
// Dirty Examples
/* const config = new Config('http://192.168.1.54:8080');
config.token = 'TOKEN';

const repo = new UserRepository();

repo.find().then((users: User[]) => {
  console.log(users);
});

repo.create({
  username: 'super-test',
  password: 'super-test',
}).then((user:User) => {
  console.log(user);
}); */
},{"./Config":1,"./entity/Message":2,"./entity/Room":3,"./entity/User":4,"./repository/UserRepository":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entity/User");
var UserRepository = /** @class */ (function () {
    function UserRepository(config) {
        this.config = config;
    }
    UserRepository.prototype.find = function () {
        return fetch(this.config.baseUrl + '/api/users', {
            headers: {
                'Authorization': 'Bearer ' + this.config.token,
            },
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (objects) {
            var newArray = [];
            objects.forEach(function (object) {
                newArray.push(Object.assign(new User_1.User(), object));
            });
            return newArray;
        });
    };
    // findOne(id: number)
    UserRepository.prototype.create = function (user) {
        return fetch(this.config.baseUrl + '/api/users', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.config.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (object) {
            return Object.assign(new User_1.User(), object);
        });
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
},{"../entity/User":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29uZmlnLnRzIiwic3JjL2VudGl0eS9NZXNzYWdlLnRzIiwic3JjL2VudGl0eS9Sb29tLnRzIiwic3JjL2VudGl0eS9Vc2VyLnRzIiwic3JjL2luZGV4LnRzIiwic3JjL3JlcG9zaXRvcnkvVXNlclJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0lBSUUsZ0JBQVksT0FBZTtRQUYzQixVQUFLLEdBQWdCLElBQUksQ0FBQztRQUd4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBQ0gsYUFBQztBQUFELENBUEEsQUFPQyxJQUFBO0FBUFksd0JBQU07Ozs7QUNHbkI7SUFBQTtJQU9BLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSwwQkFBTzs7OztBQ0RwQjtJQUFBO0lBT0EsQ0FBQztJQUFELFdBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQVBZLG9CQUFJOzs7O0FDRmpCO0lBQUE7SUFXQSxDQUFDO0lBQUQsV0FBQztBQUFELENBWEEsQUFXQyxJQUFBO0FBWFksb0JBQUk7Ozs7QUNBakIsc0NBQW1DO0FBUWpDLGVBUk0sV0FBSSxDQVFOO0FBUE4sc0NBQW1DO0FBU2pDLGVBVE0sV0FBSSxDQVNOO0FBUk4sNENBQXlDO0FBT3ZDLGtCQVBNLGlCQUFPLENBT047QUFMVCw4REFBMkQ7QUFTekQseUJBVE0sK0JBQWMsQ0FTTjtBQVJoQixtQ0FBZ0M7QUFNOUIsaUJBTk0sZUFBTSxDQU1OO0FBS1IsaUJBQWlCO0FBQ2pCOzs7Ozs7Ozs7Ozs7OztNQWNNOzs7O0FDL0JOLHVDQUFvQztBQUdwQztJQUlFLHdCQUFZLE1BQWM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDdEIsQ0FBQztJQUNELDZCQUFJLEdBQUo7UUFDRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLEVBQUU7WUFDL0MsT0FBTyxFQUFFO2dCQUNQLGVBQWUsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2FBQy9DO1NBQ0YsQ0FBQzthQUNDLElBQUksQ0FBUyxVQUFDLFFBQWtCO1lBQy9CLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQzthQUNELElBQUksQ0FBUyxVQUFDLE9BQWlCO1lBQzlCLElBQU0sUUFBUSxHQUFXLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtnQkFDckIsUUFBUSxDQUFDLElBQUksQ0FBRSxNQUFjLENBQUMsTUFBTSxDQUFDLElBQUksV0FBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUNIO0lBQ0gsQ0FBQztJQUVELHNCQUFzQjtJQUV0QiwrQkFBTSxHQUFOLFVBQU8sSUFBVTtRQUNmLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksRUFBRTtZQUMvQyxNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRTtnQkFDUCxlQUFlLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDOUMsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUMzQixDQUFDO2FBQ0MsSUFBSSxDQUFXLFVBQUMsUUFBa0I7WUFDakMsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFPLFVBQUMsTUFBYztZQUN6QixPQUFRLE1BQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FDSDtJQUNILENBQUM7SUFDSCxxQkFBQztBQUFELENBOUNBLEFBOENDLElBQUE7QUE5Q1ksd0NBQWMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuICBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgdG9rZW46IHN0cmluZ3xudWxsID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1Jvb219IGZyb20gXCIuL1Jvb21cIjtcclxuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi9Vc2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBjb250ZW50OiBzdHJpbmc7XHJcbiAgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuICB1c2VyOiBVc2VyO1xyXG4gIHJvb206IFJvb207XHJcbn1cclxuIiwiaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi9Vc2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm9vbSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgbGFuZ3VhZ2U6IHN0cmluZztcclxuICBzaXplTWF4OiBudW1iZXI7XHJcblxyXG4gIHVzZXJzOiBVc2VyW107XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFVzZXIge1xyXG4gIGlkPzogTnVtYmVyO1xyXG4gIHVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgY3JlYXRlZEF0PzogRGF0ZTtcclxuICBsYXN0UGFzc3dvcmRSZXNldERhdGU/OiBEYXRlO1xyXG4gIGVuYWJsZT86IGJvb2xlYW47XHJcbiAgZW1haWw/OiBzdHJpbmc7XHJcbiAgYmlydGhkYXlEYXRlPzogRGF0ZTtcclxuICBmaXJzdE5hbWU/OiBzdHJpbmc7XHJcbiAgbGFzdE5hbWU/OiBzdHJpbmc7XHJcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHtVc2VyfSBmcm9tICcuL2VudGl0eS9Vc2VyJztcclxuaW1wb3J0IHtSb29tfSBmcm9tICcuL2VudGl0eS9Sb29tJztcclxuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuL2VudGl0eS9NZXNzYWdlJztcclxuXHJcbmltcG9ydCB7VXNlclJlcG9zaXRvcnl9IGZyb20gJy4vcmVwb3NpdG9yeS9Vc2VyUmVwb3NpdG9yeSc7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL0NvbmZpZyc7XHJcblxyXG5leHBvcnQge1xyXG4gIFVzZXIsXHJcbiAgTWVzc2FnZSxcclxuICBSb29tLFxyXG4gIENvbmZpZyxcclxuXHJcbiAgVXNlclJlcG9zaXRvcnksXHJcbn1cclxuXHJcbi8vIERpcnR5IEV4YW1wbGVzXHJcbi8qIGNvbnN0IGNvbmZpZyA9IG5ldyBDb25maWcoJ2h0dHA6Ly8xOTIuMTY4LjEuNTQ6ODA4MCcpO1xyXG5jb25maWcudG9rZW4gPSAnVE9LRU4nO1xyXG5cclxuY29uc3QgcmVwbyA9IG5ldyBVc2VyUmVwb3NpdG9yeSgpO1xyXG5cclxucmVwby5maW5kKCkudGhlbigodXNlcnM6IFVzZXJbXSkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKHVzZXJzKTtcclxufSk7XHJcblxyXG5yZXBvLmNyZWF0ZSh7XHJcbiAgdXNlcm5hbWU6ICdzdXBlci10ZXN0JyxcclxuICBwYXNzd29yZDogJ3N1cGVyLXRlc3QnLFxyXG59KS50aGVuKCh1c2VyOlVzZXIpID0+IHtcclxuICBjb25zb2xlLmxvZyh1c2VyKTtcclxufSk7ICovXHJcbiIsImltcG9ydCB7VXNlcn0gZnJvbSBcIi4uL2VudGl0eS9Vc2VyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi4vQ29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVXNlclJlcG9zaXRvcnkge1xyXG5cclxuICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZykge1xyXG4gICAgdGhpcy5jb25maWcgPSBjb25maWdcclxuICB9XHJcbiAgZmluZCgpOiBQcm9taXNlPFVzZXJbXT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKHRoaXMuY29uZmlnLmJhc2VVcmwgKyAnL2FwaS91c2VycycsIHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy5jb25maWcudG9rZW4sXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gICAgICAudGhlbjxVc2VyW10+KChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbjxVc2VyW10+KChvYmplY3RzOiBPYmplY3RbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0FycmF5OiBVc2VyW10gPSBbXTtcclxuICAgICAgICBvYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgbmV3QXJyYXkucHVzaCgoT2JqZWN0IGFzIGFueSkuYXNzaWduKG5ldyBVc2VyKCksIG9iamVjdCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XHJcbiAgICAgIH0pXHJcbiAgICA7XHJcbiAgfVxyXG5cclxuICAvLyBmaW5kT25lKGlkOiBudW1iZXIpXHJcblxyXG4gIGNyZWF0ZSh1c2VyOiBVc2VyKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICByZXR1cm4gZmV0Y2godGhpcy5jb25maWcuYmFzZVVybCArICcvYXBpL3VzZXJzJywge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy5jb25maWcudG9rZW4sXHJcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9KVxyXG4gICAgICAudGhlbjxPYmplY3RbXT4oKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuPFVzZXI+KChvYmplY3Q6IE9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoT2JqZWN0IGFzIGFueSkuYXNzaWduKG5ldyBVc2VyKCksIG9iamVjdCk7XHJcbiAgICAgIH0pXHJcbiAgICA7XHJcbiAgfVxyXG59XHJcbiJdfQ==
