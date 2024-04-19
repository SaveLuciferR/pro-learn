<?php

namespace app\models;

use RedBeanPHP\R;

class Task extends AppModel
{
    public function getTaskBySlug($slug, $lang)
    {
        return R::getRow("SELECT c.id, c.difficulty, c.date_of_publication, cd.title, 
                                cd.description, cd.keywords, cd.content, c.slug, u.username, u.role
                                FROM challenge c JOIN challenge_description cd ON cd.challenge_id = c.id
                                JOIN user u ON u.id = c.user_id JOIN status s ON s.id = c.status_id
                                WHERE s.code LIKE 'public' AND cd.language_id = ? AND c.slug = ?", [$lang, $slug]);
    }

    public function getTaskLangProgByID($id)
    {
        return R::getAll("SELECT lp.id, lp.title
                                FROM challenge c JOIN challenge_categorylangprog cclp ON c.id = cclp.challenge_id
                                JOIN langprog lp ON lp.id = cclp.lang_prog_id
                                WHERE c.id = ?", [$id]);
    }

    public function getTaskTagByID($id)
    {
        return R::getAll("SELECT ct.title 
                                FROM challengetag ct JOIN challenge_challengetag cct ON ct.id = cct.challengetag_id 
                                WHERE cct.challenge_id = ?", [$id]);
    }

    public function getProjectForTask($id)
    {
        return R::getRow("SELECT p.slug, p.id 
                            FROM challenge c JOIN project p ON c.project_id = p.id 
                            WHERE c.id = ?", [$id]);
    }

    public function getTemplateProjectForTask($id)
    {
        return R::getRow("SELECT t.slug, t.id
                                FROM projecttemplate t JOIN challenge c ON c.template_id = t.id
                                WHERE c.id = ?", [$id]);
    }

    public function getUserSolveChallenge($userID, $slug)
    {
//        return R::getRow("SELECT p.slug
//                            FROM project p JOIN user_challenge uc ON uc.project_id = p.id
//                            JOIN challenge c ON c.id = uc.challenge_id
//                            WHERE c.slug = ? AND uc.user_id = ?", [$slug, $userID]);

        return R::getRow("SELECT uc.project_id, uc.success
                            FROM user_challenge uc JOIN challenge c ON c.id = uc.challenge_id 
                            WHERE c.slug = ? AND uc.user_id = ?", [$slug, $userID]);
    }

    public function solveTask($user, $slug, $data, $type)
    {
        $task = R::findOne('challenge', "slug = ?", [$slug]);
        $template = R::load('projecttemplate', $task['template_id']);

        R::begin();
        try {
            $project = R::dispense('project');
//            debug($data, 1);
            $project->title = $data['title'];
            $project->user_id = $user['id'];
            $project->private = true;
            $projectID = R::store($project);
            $project->slug = self::createSlug('project', 'slug', $data['title'], $projectID);
            R::store($project);
            R::commit();
        } catch (\Exception $ex) {
            debug($ex);
            R::rollback();
            return false;
        }

        if ($project->slug !== '') {
            $userCreatedTemplate = R::load('user', $template->user_id);
            if (!is_dir(USER_PROJECT . '/' . $user['username'])) {
                mkdir(USER_PROJECT . '/' . $user['username']);
            }
            $this->copyTemplateToProject(
                TEMPLATE . '/' . $userCreatedTemplate->username . '/' . $template['slug'],
                USER_PROJECT . '/' . $user['username'] . '/' . $project->slug);

            $this->saveUserTaskComplete($type, $user['id'], $task['id'], $projectID, false);

            return $project->slug;
        }
    }

    public function getSolveTask($projectID)
    {
        $project = R::load('project', $projectID);
        return $project->slug;
    }

    public function saveUserTaskComplete($type, $userID, $taskID, $projectID, $success)
    {
        R::begin();
        try {
            if ($type === 'edit') {
                R::exec("UPDATE user_challenge SET success = ?, project_id = ? WHERE user_id = ? AND challenge_id = ?", [
                        $success ? 1 : 0, $projectID, $userID, $taskID]
                );
            } else {
                R::exec("INSERT INTO user_challenge (user_id, challenge_id, project_id, success) VALUES (?, ?, ?, ?)", [
                    $userID,
                    $taskID,
                    $projectID,
                    $success ? 1 : 0
                ]);
            }
            R::commit();
        } catch (\Exception $ex) {
            debug($ex);
            R::rollback();
            return false;
        }
    }

    protected function copyTemplateToProject($src, $dist)
    {
//        debug($src . ' ' . $dist);
        if (file_exists($dist)) {
            $this->deleteDistIfExsitst($dist);
        }
        if (is_dir($src)) {
            mkdir($dist);
            $files = scandir($src);
            foreach ($files as $file) {
                if ($file != '.' && $file != '..') {
//                    debug($file, 1);
                    $this->copyTemplateToProject($src . '/' . $file, $dist . '/' . $file);
                }
            }
//            rmdir($src);
        } else if (file_exists($src)) {
            copy($src, $dist);
//            unlink($src);
        }
    }

    protected function deleteDistIfExsitst($dir)
    {
        if (is_dir($dir)) {
            $files = scandir($dir);
            foreach ($files as $file) {
                if ($file != "." && $file != "..") {
                    $this->deleteDistIfExsitst($dir . '/' . $file);
                }
            }
            rmdir($dir);
        } else if (file_exists($dir)) {
            unlink($dir);
        }
    }
}