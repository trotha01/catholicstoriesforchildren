module Page.Saints.VideoPage exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)


type alias SaintEntry =
    { name : String
    , slug : String
    , feastDay : String
    , shortBio : String
    , videoLinks : List VideoLink
    , saintPageLink : String
    }


type alias VideoLink =
    { label : String
    , href : String
    }



-- Saints with Claritas Studios video content listed first,
-- followed by additional well-known Catholic saints.


saints : List SaintEntry
saints =
    [ { name = "The Blessed Virgin Mary"
      , slug = "blessed-virgin-mary"
      , feastDay = "August 15 (Assumption), January 1 (Mary, Mother of God)"
      , shortBio = "Mary is the Mother of God and the greatest of all the saints. She said yes to God's plan, carried Jesus in her womb, and stood at the foot of the Cross. Catholics honour her through the Rosary, the Angelus, and countless prayers passed down through the centuries. She intercedes for us as our Heavenly Mother and is a model of faith, humility, and total trust in God."
      , videoLinks =
            [ { label = "Hail Mary — Animation for Children", href = "/animations/hailmary" }
            , { label = "Praying with the Saints — Rosary Videos", href = "/animations/prayingwiththesaints" }
            ]
      , saintPageLink = ""
      }
    , { name = "Saint Thérèse of Lisieux"
      , slug = "saint-therese-of-lisieux"
      , feastDay = "October 1"
      , shortBio = "Saint Thérèse of Lisieux, called the Little Flower, entered the Carmelite convent at fifteen and died at twenty-four. She taught the world her Little Way — a path of spiritual childhood, trusting God completely as a Father and offering even the smallest actions out of love for Him. She is a Doctor of the Church and one of the most beloved Catholic saints for children and adults alike. Her autobiography, The Story of a Soul, continues to inspire millions."
      , videoLinks =
            [ { label = "Saint Thérèse — Songs of the Saints", href = "/animations/songsofthesaints/1/saintth%C3%A9r%C3%A8seoflisieux" }
            , { label = "Pray the Rosary with St. Thérèse", href = "/animations/prayingwiththesaints" }
            ]
      , saintPageLink = ""
      }
    , { name = "Saint Carlo Acutis"
      , slug = "saint-carlo-acutis"
      , feastDay = "October 12"
      , shortBio = "Saint Carlo Acutis was an Italian teenager who loved Jesus in the Eucharist, built a website cataloguing Eucharistic miracles around the world, and died of leukemia at fifteen. He was beatified in 2020 and canonized by Pope Francis on April 27, 2025, becoming one of the youngest saints of the modern era. His body rests in Assisi, Italy, and he is sometimes called the Patron of the Internet."
      , videoLinks =
            [ { label = "Carlo Acutis — Songs of the Saints", href = "/animations/songsofthesaints/1/carloacutis" }
            , { label = "Pray the Rosary with Carlo Acutis", href = "/animations/prayingwiththesaints/1/praythesorrowfulmysterieswithcarlo?tab=episodes" }
            ]
      , saintPageLink = ""
      }
    , { name = "Saint Joseph"
      , slug = "saint-joseph"
      , feastDay = "March 19"
      , shortBio = "Saint Joseph is the husband of the Blessed Virgin Mary, the foster father of Jesus, and the Patron of the Universal Church. A humble carpenter from Nazareth, Joseph protected the Holy Family during the flight into Egypt and raised the Son of God with love and faithfulness. He is a model of quiet strength, fatherhood, and trust in God's will for Catholic children and families."
      , videoLinks =
            [ { label = "Saint Joseph — Songs of the Saints", href = "/animations/songsofthesaints/1/saintjoseph" }
            ]
      , saintPageLink = ""
      }
    , { name = "Saint Michael the Archangel"
      , slug = "saint-michael-the-archangel"
      , feastDay = "September 29 (Michaelmas)"
      , shortBio = "Saint Michael the Archangel is the great defender of God's people and the commander of the heavenly army. His name means 'Who is like God?' — the challenge he hurled at Lucifer in the battle of the angels. Catholics pray to Saint Michael for protection against evil, especially through the famous Saint Michael Prayer. He is the patron of soldiers, police officers, and the sick."
      , videoLinks =
            [ { label = "Saint Michael Prayer — Prayer Time with Angels", href = "/animations/prayertimewithangels/1/saintmichaelprayer" }
            ]
      , saintPageLink = ""
      }
    , { name = "Saint Patrick"
      , slug = "saint-patrick"
      , feastDay = "March 17"
      , shortBio = "Saint Patrick was a fifth-century missionary who brought the Catholic faith to Ireland. Kidnapped as a teenager and enslaved, he eventually escaped, became a priest, and returned to Ireland as a bishop. According to beloved tradition, he used the shamrock to explain the Trinity to those he was evangelizing. He is the patron saint of Ireland and one of the most recognised Catholic saints for children."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Patrick"
      }
    , { name = "Saint Francis of Assisi"
      , slug = "saint-francis-of-assisi"
      , feastDay = "October 4"
      , shortBio = "Saint Francis of Assisi was a thirteenth-century Italian friar who gave up wealth to follow Christ in radical poverty. He founded the Franciscan order, received the stigmata on Mount La Verna, and is beloved for preaching to all of creation — including the birds. His Canticle of the Sun, praising God through Brother Sun and Sister Moon, is one of the treasures of the Catholic tradition. He is the patron of animals, ecology, and Italy."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Francis%20of%20Assisi"
      }
    , { name = "Saint Nicholas of Myra"
      , slug = "saint-nicholas-of-myra"
      , feastDay = "December 6"
      , shortBio = "Saint Nicholas of Myra was a fourth-century bishop in what is now Turkey, famous for his extraordinary generosity to the poor. He secretly provided dowries for three sisters who would otherwise have been sold into slavery, tossing bags of gold through their window at night. The tradition of Father Christmas and Saint Nick descends from his extraordinary charity. He is the patron of children."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Nicholas%20of%20Myra"
      }
    , { name = "Saint Joan of Arc"
      , slug = "saint-joan-of-arc"
      , feastDay = "May 30"
      , shortBio = "Saint Joan of Arc was a fifteenth-century French teenager who heard the voices of Saints Michael, Catherine, and Margaret calling her to lead the French army. At seventeen she rode into battle and turned the tide of the Hundred Years' War. Captured, tried for heresy, and burned at the stake at nineteen, she was later declared a saint. She is the patron of France and a model of courage for Catholic children."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Joan%20of%20Arc"
      }
    , { name = "Saint Anthony of Padua"
      , slug = "saint-anthony-of-padua"
      , feastDay = "June 13"
      , shortBio = "Saint Anthony of Padua was a thirteenth-century Franciscan priest and Doctor of the Church renowned for his powerful preaching and miracles. Catholics around the world ask his intercession when searching for lost items — a tradition rooted in stories of his miraculous influence. He is the patron saint of lost things, the poor, and travellers."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Anthony%20of%20Padua"
      }
    , { name = "Saint Bernadette of Lourdes"
      , slug = "saint-bernadette-of-lourdes"
      , feastDay = "April 16"
      , shortBio = "Saint Bernadette Soubirous was a fourteen-year-old French girl to whom Our Lady appeared eighteen times at Lourdes in 1858. Despite poverty, illness, and scepticism from church authorities, Bernadette faithfully reported Mary's messages, including the miraculous spring at Lourdes that has since brought healing to millions. She is a beloved Catholic saint for children and families."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Bernadette%20of%20Lourdes"
      }
    , { name = "Saint Padre Pio"
      , slug = "saint-padre-pio"
      , feastDay = "September 23"
      , shortBio = "Saint Padre Pio of Pietrelcina was an Italian Capuchin friar who bore the wounds of Christ — the stigmata — for fifty years. Known for hearing confessions for hours each day, for bilocation, and for the fragrance of flowers that accompanied his presence, he drew millions to the sacrament of Reconciliation. He is a patron of civil defence volunteers and adolescents."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Padre%20Pio"
      }
    , { name = "Saint Faustina Kowalska"
      , slug = "saint-faustina-kowalska"
      , feastDay = "October 5"
      , shortBio = "Saint Faustina Kowalska was a Polish nun to whom Jesus appeared and entrusted the message of Divine Mercy. In her diary she recorded her conversations with Christ, who asked that the world trust in His mercy and that the Feast of Divine Mercy be celebrated on the Sunday after Easter. Her Divine Mercy Chaplet is prayed by Catholics around the world."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Faustina%20Kowalska"
      }
    , { name = "Saint Teresa of Ávila"
      , slug = "saint-teresa-of-avila"
      , feastDay = "October 15"
      , shortBio = "Saint Teresa of Ávila was a sixteenth-century Spanish Carmelite mystic and Doctor of the Church who reformed her order and wrote masterpieces of spiritual literature including The Interior Castle and The Way of Perfection. Her famous bookmark prayer — 'Let nothing disturb you; God alone suffices' — is known worldwide. She is the patron of headache sufferers and chess players."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Teresa%20of%20%C3%81vila"
      }
    , { name = "Saint Catherine of Siena"
      , slug = "saint-catherine-of-siena"
      , feastDay = "April 29"
      , shortBio = "Saint Catherine of Siena was a fourteenth-century Dominican tertiary, mystic, and Doctor of the Church who boldly called the Pope back to Rome from Avignon and worked tirelessly for Church reform. Unable to read for most of her life, she dictated hundreds of letters and her major spiritual work, The Dialogue, to secretaries. She is co-patron of Italy and Europe."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Catherine%20of%20Siena"
      }
    , { name = "Saint Francis Xavier"
      , slug = "saint-francis-xavier"
      , feastDay = "December 3"
      , shortBio = "Saint Francis Xavier was a sixteenth-century Jesuit missionary who brought the Catholic faith to India, Japan, and Southeast Asia — baptising hundreds of thousands during his travels. A close friend of Saint Ignatius of Loyola and co-founder of the Society of Jesus, he died on the doorstep of China, hoping to continue his mission. He is the patron of Catholic missions and foreign missions."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Francis%20Xavier"
      }
    , { name = "Saint Thomas Aquinas"
      , slug = "saint-thomas-aquinas"
      , feastDay = "January 28"
      , shortBio = "Saint Thomas Aquinas was a thirteenth-century Dominican friar and Doctor of the Church whose Summa Theologiae remains one of the most comprehensive works of Catholic theology and philosophy ever written. Called the Angelic Doctor, he reconciled faith and reason, showing that the truths of the Faith and the truths of philosophy are not in conflict. He is the patron of students and Catholic schools."
      , videoLinks = []
      , saintPageLink = "/saints/all?s=Saint%20Thomas%20Aquinas"
      }
    ]



-- VIEW


view : Html msg
view =
    div [ class "bg-black text-white" ]
        [ div [ class "max-w-3xl mx-auto px-5 pt-10 pb-20" ]
            [ h1 [ class "text-center mb-4" ]
                [ text "Catholic Saint Videos for Children" ]
            , p [ class "text-center text-sm opacity-60 mb-8" ]
                [ text "Looking for the full list of saints? "
                , a [ href "/saints/all", class "underline hover:text-sky-400 transition" ]
                    [ text "Browse all Catholic saints →" ]
                ]
            , div [ class "mb-10" ]
                [ p [ class "mb-4 text-lg" ]
                    [ text "Explore free Catholic saint videos for children from Claritas Studios. Each video brings a beloved saint to life through animation, song, and prayer — helping children encounter the beauty of the Catholic faith and the witness of the saints." ]
                , p [ class "mb-4" ]
                    [ text "The saints are our friends and intercessors in heaven. Learning about their lives shows children that holiness is possible at any age, in any circumstance. From the Blessed Virgin Mary to Saint Carlo Acutis — canonized in 2025 at just fifteen years old — the Catholic Church has saints for every child to love." ]
                , p []
                    [ text "Saints with Claritas Studios videos appear at the top of this list. For saints we haven't animated yet, you can still select them to learn more about their life, feast day, and how to bring their story into your home or classroom." ]
                ]
            , viewSaintsList
            , div [ class "mt-16 pt-8 border-t border-white border-opacity-20 text-center" ]
                [ p [ class "mb-3 opacity-70" ]
                    [ text "Looking for even more Catholic saints? Our full, searchable saints list includes hundreds of saints and blesseds recognised by the Catholic Church." ]
                , a
                    [ href "/saints/all"
                    , class "inline-block underline hover:text-sky-400 transition"
                    ]
                    [ text "For a list of more Catholic saints, click here." ]
                ]
            ]
        ]


viewSaintsList : Html msg
viewSaintsList =
    div [] (List.map viewSaintCard saints)


viewSaintCard : SaintEntry -> Html msg
viewSaintCard saint =
    div
        [ class "border border-white border-opacity-10 rounded-lg p-6 mb-8"
        , id saint.slug
        ]
        [ h2 [ class "text-xl mb-1" ] [ text saint.name ]
        , p [ class "text-sm opacity-50 mb-3" ]
            [ span [ class "font-semibold" ] [ text "Feast Day: " ]
            , text saint.feastDay
            ]
        , p [ class "mb-4 leading-relaxed" ] [ text saint.shortBio ]
        , if List.isEmpty saint.videoLinks then
            a
                [ href saint.saintPageLink
                , class "text-sky-400 underline hover:text-sky-300 transition text-sm"
                ]
                [ text ("Learn more about " ++ saint.name ++ " →") ]

          else
            div []
                [ p [ class "font-semibold mb-2 text-sm opacity-70" ] [ text "Catholic saint videos for children:" ]
                , ul [ class "space-y-1" ]
                    (List.map viewVideoLink saint.videoLinks)
                ]
        ]


viewVideoLink : VideoLink -> Html msg
viewVideoLink video =
    li []
        [ a
            [ href video.href
            , class "text-sky-400 underline hover:text-sky-300 transition text-sm"
            ]
            [ text ("▶ " ++ video.label) ]
        ]
