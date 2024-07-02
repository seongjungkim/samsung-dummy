#

```bash
uvicorn main:app --host 0.0.0.0 --port 8080
```

```bash
git remote add tpcg https://source.developers.google.com/p/tpcg-datacollector/r/rubicon-dummy
git remote add git-ark https://github.com/seongjungkim/rubicon-dummy
```

```bash
git remote -v                                        
git-ark https://github.com/seongjungkim/rubicon-dummy (fetch)
git-ark https://github.com/seongjungkim/rubicon-dummy (push)
tpcg    https://source.developers.google.com/p/tpcg-datacollector/r/rubicon-dummy (fetch)
tpcg    https://source.developers.google.com/p/tpcg-datacollector/r/rubicon-dummy (push)
```

```bash
git branch -v
  main   a7b2a80 Initialize
* master c66ac0c Suggestions 관련 수정
```

```bash
git status
git add routers/chatbot.py README.md routers/dummy.py
git commit -m "dummy.py 파일 추가"
git push -u tpcg master
```

```bash
PROJECT_ID=tpcg-datacollector
REGION=asia-northeast3
APP=dummy
TAG=gcr.io/$PROJECT_ID/$APP
```

### Cloud Run custom domain (Firebase hosting)

```bash
PROJECT_ID=tpcg-datacollector
REGION=asia-northeast1
APP=samsung.dummy
TAG=gcr.io/$PROJECT_ID/$APP
```


```bash
gcloud builds submit --project=$PROJECT_ID --tag $TAG
```

```bash
gcloud run deploy $APP \
--project $PROJECT_ID \
--image $TAG \
--platform managed \
--region $REGION \
--allow-unauthenticated
```

https://dummy-phdovlv6aa-du.a.run.app/sec/smartphones/all-smartphones/
https://storage.googleapis.com/rubicon-data/www.samsung.com/sec/smartphones/galaxy-s24-ultra-s928/SM-S928NZTNKOO.html

https://tpcg-datacollector.web.app/sec/smartphones/
https://samsung-dummy-phdovlv6aa-an.a.run.app/sec/smartphones/
