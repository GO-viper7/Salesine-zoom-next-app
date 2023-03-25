import axios from 'axios';

export default async function createZoomMeeting(req, res) {
  const { name, startTime, duration, repeat } = req.body;
  const meetingData = {
    "topic": name,
    "type": repeat, 
    "start_time": startTime,
    "duration": duration,
    "timezone": "America/New_York",
    "settings": {
      "host_video": true,
      "participant_video": true,
      "join_before_host": true,
      "mute_upon_entry": true,
      "approval_type": 2
    }
  }

  try {
   
    var config = {
      method: 'post',
      url: 'https://zoom.us/oauth/token?grant_type=account_credentials&account_id=9AhUDTxlQwmEXRk-jPkERg',
      headers: { 
        'Authorization': 'Basic ZlBHSGpxVWNUT2E1bzd4dEVoN0Z2QTpCT3dBRVYyT1M4bjU3MWpzU3pmVzFTd2xhWGpZRUVrQw==', 
        'Cookie': 'TS018dd1ba=01e2d6a4a1fbdd7ae5d764f02433e0469c8085d7d5536cbcca6e3128550d90788e1bd3fc83adbee428723ce4c2d97b16d70e128f0c; TS01f92dc5=01e2d6a4a1fbdd7ae5d764f02433e0469c8085d7d5536cbcca6e3128550d90788e1bd3fc83adbee428723ce4c2d97b16d70e128f0c; __cf_bm=c6ISN28fslFHOToGXu2sGCcMOpixQ2ePPUOzZ_qgIus-1679686458-0-AaHw42c3Ga2i456IRzwq7775eRDURjrihvSlGY2CzZRSnnbIhfP46bk9QvHjTjsGqxWCld6XVWShvBMuTDe8TZs=; _zm_chtaid=589; _zm_ctaid=j9drAb8dRYeZYRX1WY8PNA.1679686458842.3ea76d88fdd2bea0f972e0d045890a6c; _zm_mtk_guid=fd69b9e8eee44c6b90f828fc37342649; _zm_page_auth=us05_c_127DuhghR46CYlJfoATHuQ; _zm_ssid=us05_c_7Dm2TJ0wTUe_CJTYyI1PFg; cred=FA853A62B4A083F527047A619EEA113D'
      }
    };

    axios(config)
    .then(async function(response) {
      let token = response.data.access_token;
      const meetingResponse = await axios.post(
        `https://api.zoom.us/v2/users/me/meetings`,
        meetingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    
      res.status(200).json(meetingResponse.data);
    })
    .catch(function (error) {
      console.log(error);
    });


    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
