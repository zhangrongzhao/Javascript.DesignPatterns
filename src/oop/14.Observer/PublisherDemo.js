///**
// * Created by zhangrongzhao on 2014/7/22.
// */
//
///*Publishers are in charge of "publishing" i.e.creating the event.
//* They're also in charge of "notifying"(firing the event.)
//* */
//
//var Publisher=new Observable;
//
///*Subscribers basically..."subscribe"(or listen).
//*Once they've been "notified", their callback functions are invoked.
//* */
//
//var Subscriber=function(news){
//    //News delivered directly to my front porch.
//};
//
//Publisher.subscribeCustomer(Subscriber);
//
///*Deliver a paper:
//* sends out the news to all subscribers.
//* */
//Publisher.deliver("extre,extre,read all about it.");
//
///*That customer forgot to pay his pill.
//* */
//Publisher.unSubscribeCustomer(Subscriber);
//
//
///***********************************************************/
///*Newspaper Vendors
//* setup as new Publisher objects.
// * */
//var NewYorkTimes = new Publisher;
//var AustinHerald = new Publisher;
//var SfChronicle = new Publisher;
//
///*People who like to read
//*(Subscribers)
//* Each subscriber is set up as a callback method.
//* They all inherit from the Function prototype Object.
//* */
//
//var Joe=function(from){console.log("Delivery from "+from+"to Joe.");};
//var Lindsay=function(from){console.log("Delivery from "+from+"to Lindsay.");};
//var Quadaras=function(from){console.log("Delivery from "+from+"to Quadaras.");};
//
//
///*Here we allow them to subscribe to newspapers
// * which are the Publisher objects.
// * In this case Joe subscribes to the NY Times and the Chronicle.
// * Lindsay subscribes to NY Times Austin Herald and Chronicle.
// * And the Quadaras respectfully subscribe to the Herald and the Chronicle.*/
//Joe.subscribe(NewYorkTimes)
//   .subscribe(Sfchronicle);
//Lindsay.subscribe(AustinHerald)
//       .subscribe(Sfchronicle)
//       .subscribe(NewYorKTimes);
//Quadaras.subscribe(AustinHerald)
//        .subscribe(SfChronicle);
//
///*Then at any given time in our application,
//* our publishers can send off data
//* for the subscribers to consume and react to.*/
//
//NewYorkTimes.deliver("Here is your paper!Direct form the Big apple.");
//AustinHerald.deliver("News").deliver("Reviews")
//            .deliver("Coupons");
//SfChronicle.deliver("The weather is still chilly.")
//           .deliver("Hi Mom! I'm writing a book.");
//
