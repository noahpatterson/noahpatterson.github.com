//toggle form function
function toggle_form(e){e.find("form").slideToggle("slow")}$("#project-move").on("click",function(){$(this).toggleClass("project-move-slide")});$(".project-description").on("click",function(){$("#project-move").toggleClass("project-move-slide")});$("#contact-drop").on("click","#contact-link",function(){var e=$(this).closest("#contact-drop");toggle_form(e)});$("#submit-button").on("click",function(){var e="mailto:noah@noah-patterson.com?subject=Contact Form Questions&body="+$("input").filter("[type=textarea]").val();$(this).closest("form").attr("action",e);document.getElementById("contact-form").reset();var t=$(this).closest("#contact-drop");toggle_form(t)});$("#nav-contact-link").on("click",function(){var e=$("#contact-drop");toggle_form(e)});