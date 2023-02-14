module Team.Testimonials exposing (..)

import Team.Team exposing (Person, imagePath)



-- This is in the "Team" module for now since it uses the Person type
-- and can be viewed with viewPerson


meganReisterTestimonial : Person
meganReisterTestimonial =
    { name = "Dr. Megan Reister"
    , initials = "MR"
    , position = "Associate Professor of Special Education and Early Childhood"
    , description = "How fabulous!!! So looking forward to sharing this far and wide!!!"
    , image = "https://spp.franciscan.edu/wp-content/uploads/sites/4/2019/02/Reister.jpg"
    , socials = []
    }


ainsleyRawlingsTestimonial : Person
ainsleyRawlingsTestimonial =
    { name = "Ainsley Rawlings"
    , initials = "AR"
    , position = "Mother and Teacher"
    , description = "My kids love the guardian angel song and video! The song is beautiful and easy for my littles to remember and sing along with. ❤️ Thank you!"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/ainsleyrawlings_hyB-0rd23.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676325098991"
    , socials = []
    }


camSmithTestimonial : Person
camSmithTestimonial =
    { name = "Cam Smith"
    , initials = "CS"
    , position = "Mother and Social Worker"
    , description = "I love how there is a story, animation, and even music to learning the prayers. We know that children often, if not always, learn first through their experience and senses. The incorporation of such animation then will definitely help our children learn these prayers more easily! I will be showing these prayers to my infant child when he is older. 🙂"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/CamNguyen_ze-IRFU1d.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676325311225"
    , socials = []
    }


kellyBriggsTestimonial : Person
kellyBriggsTestimonial =
    { name = "Kelly Briggs"
    , initials = "KB"
    , position = "Social Media Specialist"
    , description = "My three year old requests the Hail Mary animation often  it makes me so happy. I love it. Almost every time during our morning prayer time she asks."
    , image = imagePath ++ "KellyBriggs.jpeg"
    , socials = []
    }
