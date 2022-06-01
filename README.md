**Studbud Web App Design Documentation**

**Introduction**

The primary target audience for my Studbud Web App design is students in primarily STEM fields who are struggling with managing their times, concentrating on their studies, keeping up with course content, and organising said content. As a result, I decided that my Studbud Web App should have 3 main sections to tackle those four problems. The first page, the Tasklist Page is actually a Kanban Board that allows the user to visualise their task in an easily digestible manner. This page allows users to create their own task columns representing what stage their work is in and place task cards underneath those columns. The second page, the Pomodoro Timer page, contains an example of the said Pomodoro Timer. The Pomodoro Timer is a widely used study method that is often used to help people with concentrating on their work. The final page is a Reference List page, where students can save references they&#39;ve found online in an easily accessible location. They can also group those references together if they have things in common. There are two widgets on the web app: a stopwatch to help users manage their study time and a music player to help them concentrate on their studies.

**Tasklist Page**

**Tasklist Page - Original Design**

<img src = "mkimages/ReferenceBrowserOriginal.png" width="700px"/>

<img src = "mkimages/AddNewTaskOriginal.png" width="700px"/>
</br>

**Tasklist Page - Final Web App Version**

<img src = "mkimages/ReferenceBrowserNew.png" width="700px"/>

<img src = "mkimages/AddNewTaskNew.png" width="700px"/>

<img src = "mkimages/AddTaskColumn.png" width="700px"/>
</br>

**Tasklist Page - Mobile**

**Original Design:**
<img src = "mkimages/TaskListMobileOriginal.png" width="200px"/>
**Web App Design:**
<img src = "mkimages/TaskListMobileNew.png" width="200px"/>

The tasklist page didn&#39;t really go through too much of a change between the version I had in my final mockup and the one I eventually created on the web app. One difference that is reflected on every single page is that the contents in the main section on the web app are a lot more constricted than it was in the mockup. This is because in an actual browser, the web app has to share the screen with the taskbar at the bottom and the browser search bars, tabs, and other things on top, limiting the space the page is allowed on screen. This just meant I had to make every page scrollable by default.

A change I made to the actual design would be in the Add Task Form, where I moved the priority rating selection from the right of date selection to underneath it. This is because I thought it was a bit confusing and awkward how the priority rating was the only option sharing a space with another, and it would be easier to read and understand if every option was just going from top to bottom.

There is also another significant addition to the final web app page, which is that I added an Add Task Column Form to the page. This form pops up when users click the Add Task Column button. Without this form, the users wouldn&#39;t be able to customise and create their own task columns, significantly hindering their ability to organise their tasks. So it was incredibly important that I had added this function

Across all the pages, I also centred and increased the size of their headings in the mobile versions of the apps. I thought that this would help improve the readability of the heading and make it more clear which page they were on from the get go.

**Pomodoro Timer Page**

**Pomodoro Timer - Original Design**

<img src = "mkimages/BigPomoOriginal.png" width="700px"/>

<img src = "mkimages/LittlePomoOriginal.png" width="700px"/>
</br>

**Pomodoro Timer - Final Web App Version**

<img src = "mkimages/BigPomoNew.png" width="700px"/>

<img src = "mkimages/LittlePomoNew.png" width="700px"/>
</br>

**Pomodoro Timer - Mobile**

**Original Design:**
<img src = "mkimages/PomodoroMobileOriginal.png" width="200px"/>
**Web App Design:**
<img src = "mkimages/PomodoroMobileNew.png" width="200px"/>

Similar to the Task List page, I didn&#39;t actually have too many differences between the pomodoro timer page design in the final web app and the final mockup design. The most significant difference is that in the web app version, the minutes and seconds in the time input form are separated and labelled, while the original was connected and unlabelled. This honestly has less to do with actual design than it has to do with coding. To my knowledge, there isn&#39;t a way to create a time input that is connected in the way shown in my mockup design. In the end, I had to separate the minute and second inputs into different &quot;number&quot; inputs instead of having one single &quot;time&quot; input. To make sure users can still understand the format of this time input, I added &quot;minute&quot; and &quot;second&quot; labels underneath each input.

When it comes to the mobile version, the main change is that I made all the inputs larger. This way, it would be a lot easier to tap on the individual number inputs, instead of having to struggle your way to the centre of the screen to a tiny input area.

**Reference List Page**

**Reference List Page - Original Design**

<img src = "mkimages/ReferenceBrowserOriginal.png" width="700px"/>

<img src = "mkimages/AddSingleReferenceOriginal.png" width="700px"/>

<img src = "mkimages/AddGroupReferenceOriginal.png" width="700px"/>
</br>

**Reference List Page - Final Web App Version**

<img src = "mkimages/ReferenceBrowserNew.png" width="700px"/>

<img src = "mkimages/AddSingleReferenceNew.png" width="700px"/>

<img src = "mkimages/AddGroupReferenceNew.png" width="700px"/>
</br>

**Reference List Page - Mobile**

**Original Design:**
<img src = "mkimages/ReferenceMobileOriginal.png" width="200px"/>
**Web App Design:**
<img src = "mkimages/ReferenceMobileNew.png" width="200px"/>

The most significant changes I made to the Reference List page is the addition of a delete reference and delete group reference button. In my original design, there was no way to actually remove any references on the page. This means that if the user accidently typed something wrong, or just simply didn&#39;t have any use for a reference anymore, there was no way to actually get rid of it. This would significantly hinder their ability to organise their references. Thus, to solve that problem, I added the remove reference and remove group reference buttons onto the page.

In the mobile version, I also changed the group reference heading to go down in a column, as the addition of the remove group reference button made it very difficult to properly fit everything in a single row. This would also give the user more space for the title of their group reference.

**Widgets (Stopwatch + Music Player)**

**Widgets (Stopwatch + Music Player) - Original Design**

<img src = "mkimages/TaskListBrowserOriginal.png" width="700px"/>

<img src = "mkimages/StopwatchOpenOriginal.png" width="700px"/>

<img src = "mkimages/PlaylistOriginal.png" width="700px"/>
</br>

**Widgets (Stopwatch + Music Player) - Final Web App**

<img src = "mkimages/TaskListBrowserNew.png" width="700px"/>

<img src = "mkimages/StopwatchOpenNew.png" width="700px"/>

<img src = "mkimages/PlaylistNew.png" width="700px"/>

**Reference List Page - Mobile**

**Original Design:**
<img src = "mkimages/TaskListMobileOriginal.png" width="200px"/>
**Web App Design:**
<img src = "mkimages/TaskListMobileNew.png" width="200px"/>

There were a few changes to my widgets from my mockup design to my final web app design. In the final web app, I made the stopwatch and its pop up a little bigger. I thought this would make the stopwatch function more obvious, as the original version was a little too small, and a bit easy to miss. In regards to the music player, I added a music timeline and time display underneath the pause/play, next song, and previous song buttons. This allows users to know how far along a song they currently are. Honestly, there&#39;s no real design reason I added this function. This is just a staple feature to any music player, and not having it just makes the player feel incomplete. Another change I made is that I made the pop-out playlist cover the header as well as the main section. This is because, with the way the page is constricted on the browser, having the playlist be further covered by both the header and the music player makes it feel incredibly claustrophobic. Letting the playlist also cover the header gives this playlist more breathing room, making it more comfortable to look at and scroll through without getting in the way of any of its functionality.

The main change I made in the mobile version of my widgets is that I added a play/pause button in the music player. In the original design, there was nothing in the music player other than the title and the playlist. This means that the only way the user could play a song was to open the playlist and tap a song. This is incredibly inconvenient, and there&#39;s no way for them to pause the song either. With the play/pause button present, the user could easily play the music they want to listen to. Unfortunately, there still wasn&#39;t enough space to fit the next song button, previous song button, and timeline. However, having the play/pause button should at least make a minimum viable version of the music player on mobile.