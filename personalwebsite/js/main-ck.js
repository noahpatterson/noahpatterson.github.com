//goggle analytics
function googleAnalyticsBuild(e,t,n,r,i){return _gaq.push(["_trackEvent",e,t,n,r,i])}function trackOutboundLink(e,t,n){try{_gaq.push(["_trackEvent",t,n])}catch(r){}}function toggle_form(e){e.find("form").slideToggle("slow").toggleClass("contact-form-visible");e.find("form").hasClass("contact-form-visible")&&googleAnalyticsBuild("Contact","contact_reveal","Opened the contact form")}$("#blog").click(function(e){trackOutboundLink(this,"Outbound Link","blog.albinosquirrel.com");if($(this).attr("target")===undefined||$(this).attr("target").toLowerCase()!="_blank"){setTimeout(function(){document.location.href=link.href},100);return!1}});$("#project-move").on("click",function(){$(this).toggleClass("project-move-slide");$(this).hasClass("project-move-slide")&&googleAnalyticsBuild("Project","description_reveal","Viewed a description of a project")});$("html").click(function(){$("#project-move").hasClass("project-move-slide")&&$("#project-move").removeClass("project-move-slide")});$("html").click(function(){$("#contact-drop").find("form").hasClass("contact-form-visible")&&$("#contact-drop").find("form").slideToggle("slow").toggleClass("contact-form-visible")});$("#project-move").click(function(e){e.stopPropagation()});$("#contact-drop").find("form").click(function(e){e.stopPropagation()});$("#contact-drop").click(function(e){e.stopPropagation()});$("#nav-contact-link").click(function(e){e.stopPropagation()});$("#contact-drop").on("click","#contact-link",function(){var e=$(this).closest("#contact-drop");toggle_form(e)});$("#submit-button").on("click",function(){var e="mailto:noah@noah-patterson.com?subject=Contact Form Questions&body="+$("input").filter("[type=textarea]").val();$(this).closest("form").attr("action",e);document.getElementById("contact-form").reset();var t=$(this).closest("#contact-drop");toggle_form(t);googleAnalyticsBuild("Contact","contact_submit","Submitted a contact form")});$("#nav-contact-link").on("click",function(){var e=$("#contact-drop");toggle_form(e)});var port_pos=Math.floor($("#portfolio").offset().top);$("#portfolio-scroll").on("click",function(){var e=document.getElementsByTagName("html")[0].scrollTop,t=document.getElementsByTagName("body")[0].scrollTop;(t!==port_pos&&e===0||e!==port_pos&&t===0)&&$("html,body").animate({scrollTop:$("#portfolio").offset().top},1e3)});var abt_pos=Math.floor($("#about").offset().top);$("#about-scroll").on("click",function(){var e=document.getElementsByTagName("html")[0].scrollTop,t=document.getElementsByTagName("body")[0].scrollTop;(t!==abt_pos&&e===0||e!==abt_pos&&t===0)&&$("html,body").animate({scrollTop:$("#about").offset().top},1e3)});var regions=[],scr_top_init=$(window).scrollTop();regions.push(port_pos);regions.push(abt_pos-400);console.log(regions[0]);scr_top_init<=abt_pos?$("#portfolio-scroll").addClass("highlight"):scr_top>=abt_pos&&$("#about-scroll").addClass("highlight");$(window).scroll(function(){console.log("scrolled");var e=$(this).scrollTop();if(e>=regions[0]&&e<regions[1]&&!$("#portfolio-scroll").hasClass("highlight")){console.log(e+" portfolio");$("#about-scroll").removeClass("highlight");$("#portfolio-scroll").addClass("highlight")}else if(e>=regions[1]&&!$("#about-scroll").hasClass("highlight")){console.log(e+" about");$("#portfolio-scroll").removeClass("highlight");$("#about-scroll").addClass("highlight")}});