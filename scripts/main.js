// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function() {
    const params = new URLSearchParams(window.location.search);
    const inv_c0de = params.get('c0de');

    if(inv_c0de){
        $('#code-input').val(inv_c0de);
        $("#code-input").prop("readonly", true);
    }
    



    $('#btn_default_gallery').trigger('click');

    AOS.init({
        // uncomment below for on-scroll animations to played only once
        // once: true
    }); // initialize animate on scroll library

    $('.navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });

    $("#form-rsvp").on("submit", function (event) {
        event.preventDefault();
    
        Swal.fire({
            icon: "question",
            title: "Are you sure you want to submit the RSVP?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            if (result.isConfirmed) {
                var swal_fire_title = "Submitting RSVP Information";

                Swal.fire({
                    title: swal_fire_title,
                    text: 'Submitting RSVP and email sending is processing. Please wait....',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                var form_datasss = Object.fromEntries(
                    new FormData(this).entries()
                );

                $.ajax({
                    url: 'https://owr4ftovxkfxorsrn7sdjkante0xdged.lambda-url.ap-southeast-1.on.aws/',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(form_datasss),
                    success: function(response) {
                        Swal.close();
                        
                        if (response.resp0nse_status === "success!!!") {
                            Swal.fire({
                                icon: "success",
                                title: swal_fire_title,
                                text: "SUCCESS!!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else if (response.resp0nse_status === "validation!!!") {
                            Swal.fire({
                                icon: "warning",
                                title: swal_fire_title,
                                text: response.resp0nse_message
                            });
                        } else {
                            // console.error("Server error:", response);
                            Swal.fire(swal_fire_title, "API Server Error", "error");
                        }
                    },
                    error: function(xhr, status, error) {
                        // console.error("AJAX error:", error);
                        Swal.fire(swal_fire_title, "API Connection Error", "error");
                    }
                });

                // $.ajax({
                //     type: "POST",
                //     url: "xxx.php",
                //     data: $(this).serialize(),
                //     headers: {
                //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                //     },
                //     dataType: "json",
                //     success: function(response) {
                //         Swal.close();
                        
                //         if (response.resp0nse_status === "success!!!") {
                //             Swal.fire({
                //                 icon: "success",
                //                 title: swal_fire_title,
                //                 text: "SUCCESS!!"
                //             }).then((result) => {
                //                 if (result.isConfirmed) {
                //                     window.location.reload();
                //                 }
                //             });
                //         } else if (response.resp0nse_status === "validation!!!") {
                //             Swal.fire({
                //                 icon: "warning",
                //                 title: swal_fire_title,
                //                 text: response.resp0nse_message
                //             });
                //         } else {
                //             // console.error("Server error:", response);
                //             Swal.fire(swal_fire_title, "API Server Error", "error");
                //         }
                //     },
                //     error: function(xhr, status, error) {
                //         // console.error("AJAX error:", error);
                //         Swal.fire(swal_fire_title, "API Connection Error", "error");
                //     }
                // });
                
            } else if (result.isDenied) {
                
            }
        });
    });
    
});

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function(event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
            $("html, body").animate({
                scrollTop: target.offset().top
            }, 1000,

            function() {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    // Checking if the target was focused
                    return false;
                } else {
                    $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                }
            });
        }
    }
});

// Photo Filter
var activeFilter = "all";

$(".ww-filter-button").on("click", function(e) {
    // remove btn-primary from all buttons first
    $(".ww-filter-button").removeClass("btn-primary");
    $(".ww-filter-button").addClass("btn-outline-primary");

    // add btn-primary to active button
    var button = $(this);
    button.removeClass("btn-outline-primary");
    button.addClass("btn-primary");
    filterItems(button.data("filter"));
    e.preventDefault();
});

function filterItems(filter) {
    if (filter === activeFilter) {
        return;
    }

    activeFilter = filter;
    $(".ww-gallery .card").each(function() {
        var card = $(this);
        var groups = card.data("groups");
        var show = false;
        if (filter === "all") {
            show = true;
        } else {
            for (var i = 0; i < groups.length; i++) {
                if (groups[i] === filter) {
                    show = true;
                }
            }
        }
        // hide everything first
        card.fadeOut(400);
        setTimeout(function() {
            if (show && !card.is(":visible")) {
                card.fadeIn(400);
            }
        }, 500);
    });
}

// Light Box
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});
