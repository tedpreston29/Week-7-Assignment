16/10/25

Created express server and React client side using vite. added boiler plate to express and set up a route get request.

created and seeded my database on supabase with two tables games and cheat codes. connected cheat codes to games using foreign key game_id INT REFERENCES games(id).

17/10

created queries to ask db for info I want displaying

started on my frontend by adding components as a 'skeleton' of how I want my app tlayout to be.

18/10/25
changed components around as I was confusing myself with what does what. I now have a header that will be visible all the time using browser router and routes. Then I have my landing page component that the client will open the app onto.The plan with Landing page is to have an enter button that when clicked, will take them to the GameLibrary component.

19/10

Linked GameDetails with GameLibrary so that a game can be clicked and it will display the game and the code info.
(I found adding the game codes very difficult and it took a lot of time... I'm still not 100% sure on the process I used. I did have guidance with this.)

added post route. REFLECTION - This was also difficult without looking back onto old lessons every two seconds!
