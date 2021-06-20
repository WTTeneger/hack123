var masLog = []
var masCount = 6

function resize_back(obj) {
    // obj.style = ''
    obj = document.getElementsByClassName('main_block')
    obj[0].remove();
    obj[0].style = 'display:block';

    // obj[0].remove();



}



async function filling_blocks() {
    count_el = document.getElementsByClassName('main_block').length
    console.log(count_el);
    if (count_el <= 10) {
        q = []
        for (el of document.getElementsByClassName('block_filter_active')) {
            console.log();
            q.push(el.getElementsByTagName('h1')[0].innerText)
        }
        console.log(q);
        m_url = '/api/v0.1/get_slides'
        data = {
            "type": {
                "types": []
            },
            "count": 5
        }
        sender(m_url, data).then(data => {
            // console.log(data);

            for (el in data['question']) {
                el = data['question'][el]
                console.log(el);

                qqee =
                    `<div class="main_block" style='display:none' ids ='${el['id']}' id='jobs_slide'>
                    <div class="sq">
                        <div class="pht">
                            <div class="buttons">
                                <div class="button_react button_react_like"></div>
                                <div class="button_react button_react_nope"></div>
                            </div>
                        </div>
                    </div>
                    <div style="height: 21%; padding: 2% 2% 0% 2%;">
                        <div class="title_box_q">
                            <h1>${el['title']}</h1>
                        </div>
                        <div class="disc_box_q">
                            <h2>09.09.2021 09:30</h2>
                        </div>
                        <div class="dist_box_q">
                            <h2>3 км от тебя</h2>
                        </div>
        
                    </div>
        
                </div>
                `
                document.getElementById('lister').innerHTML += qqee


            }


        });
    }
}

filling_blocks()
var tn = 0
$(function() {
    $("#lister").swipe({
        //Generic swipe handler for all directions
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
            // $(this).text("You swiped " + direction);l\
            // console.log(distance);
            var pasivity = false
            for (el in event.path) {
                if (event.path[el].id == 'jobs_slide') {
                    pasivity = true
                    break
                }
            }
            if (pasivity) {
                console.log('Свайп там, logic');
                console.log(direction);
                if (direction == 'up') {
                    document.getElementById('box_info').classList.add('slide_box_info_active')
                }

                if (direction == 'down') {
                    document.getElementById('box_info').classList.remove('slide_box_info_active')
                }

                if (direction == 'left') {
                    document.getElementById('jobs_slide').style = 'transform: translateX(-100vw) scale(0.5)'
                    els = {
                            'id_user': 0,
                            'id_slide': document.getElementById('jobs_slide').getAttribute('ids'),
                            'action': 1,
                            'time': Date.now()
                        }
                        // console.log(els);
                    masLog.push(els)
                }
                if (direction == 'right') {
                    document.getElementById('jobs_slide').style = 'transform: translateX(100vw) scale(0.5)'
                    els = {
                            'id_user': 0,
                            'id_slide': document.getElementById('jobs_slide').getAttribute('ids'),
                            'action': 0,
                            'time': Date.now()
                        }
                        // console.log(els);
                    masLog.push(els)

                }

                if (direction == 'right' || direction == 'left') {
                    // document.getElementById('box_info').classList.remove('slide_box_info_active')
                    if (parseInt(new Date().getTime() / 1000) > tn + 0.3) {
                        console.log('asd');
                        setTimeout(resize_back, 300, document.getElementById('jobs_slide'));
                        console.log('sqq');
                        tn = parseInt(new Date().getTime() / 1000)
                        filling_blocks()



                        if (masLog.length >= masCount) {
                            // console.log(masLog);
                            m_url = '/api/v0.1/post_user_history'
                            data = {
                                'history': masLog
                            }
                            masLog = []
                                // sender(m_url, data)
                            sender(m_url, data).then(data => {

                            })
                        }
                        // localStorage.setItem('storage_hostory', masLog)

                    }


                }


            }
        }
    });

    //Set some options later
    $("#test").swipe({ fingers: 2 });
});