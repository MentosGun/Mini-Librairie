(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());
exports.Message = Message;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = /** @class */ (function () {
    function Room() {
    }
    return Room;
}());
exports.Room = Room;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
},{}],4:[function(require,module,exports){
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
var repo = new UserRepository_1.UserRepository();
repo.find().then(function (users) {
    console.log(users);
});
repo.create({
    username: 'super-test',
    password: 'super-test',
}).then(function (user) {
    console.log(user);
});
},{"./entity/Message":1,"./entity/Room":2,"./entity/User":3,"./repository/UserRepository":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entity/User");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.find = function () {
        return fetch('http://192.168.1.54:8080/api/users', {
            headers: {
                'Authorization': 'Bearer (TOKEN)'
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
        return fetch('http://192.168.1.54:8080/api/users', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer (TOKEN)',
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
},{"../entity/User":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZW50aXR5L01lc3NhZ2UudHMiLCJzcmMvZW50aXR5L1Jvb20udHMiLCJzcmMvZW50aXR5L1VzZXIudHMiLCJzcmMvaW5kZXgudHMiLCJzcmMvcmVwb3NpdG9yeS9Vc2VyUmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDR0E7SUFBQTtJQU9BLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSwwQkFBTzs7OztBQ0RwQjtJQUFBO0lBT0EsQ0FBQztJQUFELFdBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQVBZLG9CQUFJOzs7O0FDRmpCO0lBQUE7SUFXQSxDQUFDO0lBQUQsV0FBQztBQUFELENBWEEsQUFXQyxJQUFBO0FBWFksb0JBQUk7Ozs7QUNBakIsc0NBQW1DO0FBT2pDLGVBUE0sV0FBSSxDQU9OO0FBTk4sc0NBQW1DO0FBUWpDLGVBUk0sV0FBSSxDQVFOO0FBUE4sNENBQXlDO0FBTXZDLGtCQU5NLGlCQUFPLENBTU47QUFKVCw4REFBMkQ7QUFPekQseUJBUE0sK0JBQWMsQ0FPTjtBQUdoQixJQUFNLElBQUksR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztBQUVsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBYTtJQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNWLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFFBQVEsRUFBRSxZQUFZO0NBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFTO0lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUM7Ozs7QUN6QkgsdUNBQW9DO0FBRXBDO0lBQUE7SUF3Q0EsQ0FBQztJQXZDQyw2QkFBSSxHQUFKO1FBQ0UsT0FBTyxLQUFLLENBQUMsb0NBQW9DLEVBQUU7WUFDakQsT0FBTyxFQUFFO2dCQUNQLGVBQWUsRUFBRSxnQkFBZ0I7YUFDbEM7U0FDRixDQUFDO2FBQ0MsSUFBSSxDQUFTLFVBQUMsUUFBa0I7WUFDL0IsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFTLFVBQUMsT0FBaUI7WUFDOUIsSUFBTSxRQUFRLEdBQVcsRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO2dCQUNyQixRQUFRLENBQUMsSUFBSSxDQUFFLE1BQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQ0g7SUFDSCxDQUFDO0lBRUQsc0JBQXNCO0lBRXRCLCtCQUFNLEdBQU4sVUFBTyxJQUFVO1FBQ2YsT0FBTyxLQUFLLENBQUMsb0NBQW9DLEVBQUU7WUFDakQsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ1AsZUFBZSxFQUFFLGdCQUFnQjtnQkFDakMsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUMzQixDQUFDO2FBQ0MsSUFBSSxDQUFXLFVBQUMsUUFBa0I7WUFDakMsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFPLFVBQUMsTUFBYztZQUN6QixPQUFRLE1BQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FDSDtJQUNILENBQUM7SUFDSCxxQkFBQztBQUFELENBeENBLEFBd0NDLElBQUE7QUF4Q1ksd0NBQWMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQge1Jvb219IGZyb20gXCIuL1Jvb21cIjtcclxuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi9Vc2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBjb250ZW50OiBzdHJpbmc7XHJcbiAgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuICB1c2VyOiBVc2VyO1xyXG4gIHJvb206IFJvb207XHJcbn1cclxuIiwiaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi9Vc2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm9vbSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgbGFuZ3VhZ2U6IHN0cmluZztcclxuICBzaXplTWF4OiBudW1iZXI7XHJcblxyXG4gIHVzZXJzOiBVc2VyW107XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFVzZXIge1xyXG4gIGlkPzogTnVtYmVyO1xyXG4gIHVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgY3JlYXRlZEF0PzogRGF0ZTtcclxuICBsYXN0UGFzc3dvcmRSZXNldERhdGU/OiBEYXRlO1xyXG4gIGVuYWJsZT86IGJvb2xlYW47XHJcbiAgZW1haWw/OiBzdHJpbmc7XHJcbiAgYmlydGhkYXlEYXRlPzogRGF0ZTtcclxuICBmaXJzdE5hbWU/OiBzdHJpbmc7XHJcbiAgbGFzdE5hbWU/OiBzdHJpbmc7XHJcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHtVc2VyfSBmcm9tICcuL2VudGl0eS9Vc2VyJztcclxuaW1wb3J0IHtSb29tfSBmcm9tICcuL2VudGl0eS9Sb29tJztcclxuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuL2VudGl0eS9NZXNzYWdlJztcclxuXHJcbmltcG9ydCB7VXNlclJlcG9zaXRvcnl9IGZyb20gJy4vcmVwb3NpdG9yeS9Vc2VyUmVwb3NpdG9yeSc7XHJcblxyXG5leHBvcnQge1xyXG4gIFVzZXIsXHJcbiAgTWVzc2FnZSxcclxuICBSb29tLFxyXG5cclxuICBVc2VyUmVwb3NpdG9yeSxcclxufVxyXG5cclxuY29uc3QgcmVwbyA9IG5ldyBVc2VyUmVwb3NpdG9yeSgpO1xyXG5cclxucmVwby5maW5kKCkudGhlbigodXNlcnM6IFVzZXJbXSkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKHVzZXJzKTtcclxufSk7XHJcblxyXG5yZXBvLmNyZWF0ZSh7XHJcbiAgdXNlcm5hbWU6ICdzdXBlci10ZXN0JyxcclxuICBwYXNzd29yZDogJ3N1cGVyLXRlc3QnLFxyXG59KS50aGVuKCh1c2VyOlVzZXIpID0+IHtcclxuICBjb25zb2xlLmxvZyh1c2VyKTtcclxufSk7XHJcbiIsImltcG9ydCB7VXNlcn0gZnJvbSBcIi4uL2VudGl0eS9Vc2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVXNlclJlcG9zaXRvcnkge1xyXG4gIGZpbmQoKTogUHJvbWlzZTxVc2VyW10+IHtcclxuICAgIHJldHVybiBmZXRjaCgnaHR0cDovLzE5Mi4xNjguMS41NDo4MDgwL2FwaS91c2VycycsIHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAoVE9LRU4pJ1xyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICAgICAgLnRoZW48VXNlcltdPigocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW48VXNlcltdPigob2JqZWN0czogT2JqZWN0W10pID0+IHtcclxuICAgICAgICBjb25zdCBuZXdBcnJheTogVXNlcltdID0gW107XHJcbiAgICAgICAgb2JqZWN0cy5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgICAgIG5ld0FycmF5LnB1c2goKE9iamVjdCBhcyBhbnkpLmFzc2lnbihuZXcgVXNlcigpLCBvYmplY3QpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xyXG4gICAgICB9KVxyXG4gICAgO1xyXG4gIH1cclxuXHJcbiAgLy8gZmluZE9uZShpZDogbnVtYmVyKVxyXG5cclxuICBjcmVhdGUodXNlcjogVXNlcik6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgcmV0dXJuIGZldGNoKCdodHRwOi8vMTkyLjE2OC4xLjU0OjgwODAvYXBpL3VzZXJzJywge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAoVE9LRU4pJyxcclxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgIH0pXHJcbiAgICAgIC50aGVuPE9iamVjdFtdPigocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW48VXNlcj4oKG9iamVjdDogT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChPYmplY3QgYXMgYW55KS5hc3NpZ24obmV3IFVzZXIoKSwgb2JqZWN0KTtcclxuICAgICAgfSlcclxuICAgIDtcclxuICB9XHJcbn1cclxuIl19
