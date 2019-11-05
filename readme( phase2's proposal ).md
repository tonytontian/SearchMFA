# SearchMFA
Ver 2.0
DS5500 Project2 proposal


# Authors
Hsiang-wei Chao

Yu Tian

Zhongheng Yang

# 	Summary

      As a reminder for our project,  visitors in MFA will be able to obtain supplementary background information by taking 
      pictures of the art works directly, by using our app. You may refer to our materials for phase1, for more details.
      Following what we did in phase1, phase2 will focus on rendering top k closest(possible) paintings for users using our app. The dataset we are using are the 8000+ images that we crawled in phase1.

      Also, we will deploy our app to a remote server.

      What’s more, we will provide a auto-crop features for users uploading their uncropped photos. e.g, there may be white wall and painting frame in the uncropped photo.
        
# 	Proposed plan of research	 

      For top k rendering, we may top k pages until our precise@K metric is satisfactory, e.g, over 85%. 

      For auto-crop, we need to have a metric showing that how our precision after cropping improves.
     

# 	Preliminary results

## 	Motivation to show top k results and auto-crop

      In addition to the plots in result section of phase 1’s reports, showing that top k results and auto-crop both greatly improves detection precision@K, here is another proof. 

      Distributions of distance between the photo taken and museum paintings are like the figure below, where we have very few paintings that are close to the photo. So rendering top k paintings is a sensible move.
      
      ![figure](/figureForPhase2Proposal.png)

## 	Available cropping methods

      We tried some auto-crop library which can give us a result which crops most of white walls, but not the decorative golden painting frame. This suggests us to do our own cropping.
