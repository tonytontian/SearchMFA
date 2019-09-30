# SearchMFA
## Authors
Yu Tian

Zhongheng Yang

Hsiangwei Chao

## Summary
Museum of Fine Arts (MFA) contains more than 450,000 delicate art works, attracting visitors around the world. While admiring the arts in the museum, related background information of the art works can be obtained by scanning the QR codes beside them.
In this project, we would like to present a solution utilizing computer vision technique to remove the barrier of scanning QR code. Visitors will be able to take pictures of the art works directly for better user experience. Matched images and background information will be fetched from MFA official website once photos taken by users are uploaded.

## Proposed Plan of Research
SearchMFA will be a Content-Based Image Retrieval system tailored for searching art works in MFA. Due to technical difficulties and time constraints, its functionality will be limited to searching only paintings.

Algorithm-wise, image hashing algorithms will be first tested and employed by this project. Hash function is any function that can be used to map data of arbitrary size to fixed-size values[1]. We are using hash function specific for image and generate unique fixed-size value for each image. For retrieving target image, candidate with minimum difference compared with the hashcode of given input image will be taken as final output. If time permits, advanced algorithms such as convolutional neural network will be tried out for improving image matching accuracy.

A full stack data driven software will be built. In the first version of SearchMFA, we plan to build web-based application using tech stacks including but not limited to MongoDB, Scripy, Mysql, ReactJS, flask, Django. We are planning using scrapy to scrawl artwork information including digital copy and text information for artwork. All crawled data will be preprocessed and stored in local database. Front-end will provide functions of uploading user taken photos and rendering retrieved information. If time permits, mobile based application front-end using React Naive may be developed for easier usage and better user experience. 

## Preliminary Results
Three photos of different paintings taken by the authors have been attempted to retrieve from 2102 art works scraped from MFA website. Using the difference of aHash of the image as distance function, all three photos are correctly retrieved. In addition, we found that cropped images can be better retrieved compare with original photos. Results and codes are shown are github, if you want to see it please give us instructors’ github account. ( non-ccis normal account preferred, since we are not using ccis account).

We tried 4 image hashing algorithms and they performed similarly.

## References
[1] https://www.mfa.org/

[2] https://en.wikipedia.org/wiki/Hash_function

[3] https://github.com/JohannesBuchner/imagehash
