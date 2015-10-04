Template.Chat.events({});
Template.Chat.helpers({});
Template.Chat.created = function() {};
Template.Chat.rendered = function() {
  (function(){
        //Set these to avoid having to enter them everytime
        var URL = 'wss://httpapi.labs.nuance.com/v1?';
        var APP_ID = "NMDPTRIAL_paulcu_gmail_com20151003073615";
        var APP_KEY = "3b05cf77ea96748d147fa5c766f09744ac0678eb8873dae2fd89e2efb5f8cff1fd9e68e734dc75485c1a0fc20aa606b6ad7fa135f27b18f004fadfbaf2aeabef";
        var USER_ID = "42";
        var NLU_TAG = "V1_Project775_App373";


        var userMedia = undefined;
        navigator.getUserMedia({
            audio:true
        }, function(stream){
            userMedia = stream;
        }, function(error){
            console.error("Could not get User Media: " + error);
        });

        //
        // APP STATE
        var isRecording = false;
        // NODES
        var $content = $('#content');
        var $url = $('#url');
        var $appKey = $('#app_key');
        var $appId = $('#app_id');
        var $userId = $('#user_id');
        var $nluTag = $('#nlu_tag');
        var $connect = $('#connect');
        var $ttsGo = $('#tts_go');
        var $ttsText = $('#tts_text');
        var $ttsDebug = $('#tts_debug_output');
        var $asrRecord = $('#asr_go');
        var $asrLabel = $('#asr_label');
        var $asrViz = $('#asr_viz');
        var $asrDebug = $('#asr_debug_output');
        var $asrVizCtx = $asrViz.get()[0].getContext('2d');

        var dLog = function dLog(msg, logger){
            var d = new Date();
            logger.prepend('<div><em>'+d.toISOString()+'</em> &nbsp; <pre>'+msg+'</pre></div>');
        };


        //
        // Connect
        function connect() {

            // INIT THE SDK
            Nuance.connect({
                appId: $appId.val(),
                appKey: $appKey.val(),
                userId: $userId.val(),
                url: $url.val(),

                onopen: function() {
                    console.log("Websocket Opened");
                    $content.addClass('connected');
                },
                onclose: function() {
                    console.log("Websocket Closed");
                    $content.removeClass('connected');
                },
                onmessage: function(msg) {
                    console.log(msg);
                    if(msg.message == "volume") {
                       viz(msg.volume);
                    } else if (msg.result_type == "NVC_TTS_CMD") {
                        dLog(JSON.stringify(msg, null, 2), $ttsDebug);
                    } else if (msg.result_type == "NDSP_ASR_APP_CMD") {
                        dLog(JSON.stringify(msg, null, 2), $asrDebug);
                    }
                },
                onerror: function(error) {
                    console.error(error);
                    $content.removeClass('connected');
                }

            });
        };
        $connect.on('click', connect);

        $url.val(URL || '');
        $appId.val(APP_ID || '');
        $appKey.val(APP_KEY || '');
        $userId.val(USER_ID || '');
        $nluTag.val(NLU_TAG || '');


        // Disconnect
        $(window).unload(function(){
            Nuance.disconnect();
        });




        //
        // TTS
        function tts(evt){
            Nuance.playTTS({
                language: 'eng-USA',
                voice: 'ava',
                text: $ttsText.val()
            });
        };
        $ttsGo.on('click', tts);


        //
        // ASR / NLU
        function asr(evt){
            if(isRecording) {
                Nuance.stopASR();
                $asrLabel.text('RECORD');
            } else {
                cleanViz();

                var options = {
                    userMedia: userMedia
                };
                if($nluTag.val()) {
                    options.nlu = true;
                    options.tag = $nluTag.val();
                }
                Nuance.startASR(options);
                $asrLabel.text('STOP RECORDING');
            }
            isRecording = !isRecording;
        };
        $asrRecord.on('click', asr);


        //
        // ASR Volume visualization

        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function(callback, element){
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();

        var asrVizData = {};
        function cleanViz(){
            var parentWidth = $asrViz.parent().width();
            $asrViz[0].getContext('2d').canvas.width = parentWidth;
            asrVizData = {
                w: parentWidth,
                h: 256,
                col: 0,
                tickWidth: 0.5
            };
            var w = asrVizData.w, h = asrVizData.h;
            $asrVizCtx.clearRect(0, 0, w, h); // TODO: pull out height/width
            $asrVizCtx.strokeStyle = '#333';
            var y = (h/2) + 0.5;
            $asrVizCtx.moveTo(0,y);
            $asrVizCtx.lineTo(w-1,y);
            $asrVizCtx.stroke();
            asrVizData.col = 0;
        };

        function viz(amplitudeArray){
            var h = asrVizData.h;
            requestAnimFrame(function(){
                // Drawing the Time Domain onto the Canvas element
                var min = 999999;
                var max = 0;
                for(var i=0; i<amplitudeArray.length; i++){
                    var val = amplitudeArray[i]/asrVizData.h;
                    if(val>max){
                        max=val;
                    } else if(val<min){
                        min=val;
                    }
                }
                var yLow = h - (h*min) - 1;
                var yHigh = h - (h*max) - 1;
                $asrVizCtx.fillStyle = '#6d8f52';
                $asrVizCtx.fillRect(asrVizData.col,yLow,asrVizData.tickWidth,yHigh-yLow);
                asrVizData.col += 1;
                if(asrVizData.col>=asrVizData.w){
                    asrVizData.col = 0;
                    cleanViz();
                }
            });
        };
        cleanViz();

    })();
};
