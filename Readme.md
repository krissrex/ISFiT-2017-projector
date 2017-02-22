# Live social media for ISFiT 2017

The *International Student Festival in Trondheim* had a webpage displayed on TVs/projectors to show live updates on social media.

<img src="img/screenshot.png" alt="screenshot of page">

It's not too pretty, but was made in less than 12 hours, and on the same day it went live.

The frontend uses [Vue 2](https://github.com/vuejs/vue), and the backend is Node with Express. Websockets from [socket.io](https://github.com/socketio/socket.io) keeps the twitter feed updated.

Run `npm install` inside `./admin`, `./frontend` and `./server` before attempting to use them. 
The output of admin and frontend is supposed to live inside the folder `public` inside `./server`.  
Refer to [deploy.txt](deploy.txt) for more info. (It's actually a `.sh` but you shouldn't run it)


```
Copyright 2017 Gobitech AS
Copyright 2017 Kristian Rekstad

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```