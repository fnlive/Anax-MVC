<?php
/**
 * class for commenting
 */
namespace Anax\CommentDb;

class CommentController implements \Anax\DI\IInjectionAware
{
    use \Anax\DI\TInjectable,
    \Anax\MVC\TRedirectHelpers;

    /**
     * Initialize the controller.
     *
     * @return void
     */
    public function initialize()
    {
        $this->comments = new \Anax\CommentDb\CommentsInDb();
        $this->comments->setDI($this->di);
    }

    /**
     * Setup initial table for users.
     *
     * @return void
     */
    public function setupAction()
    {
        $this->comments->init();
        // $this->redirectTo($_SERVER['HTTP_REFERER']);
    }
    /**
     * List all comments for all flows.
     *
     * @return void
     */
    public function listAction()
    {
        $all = $this->comments->findAll();
        $flow = $this->request->getRoute();
        $link = $this->url->create('comment/add/' . $flow);
        $this->theme->setTitle("List all users");
        $this->views->add('comment/commentsdb', [
            'comments' => $all,
            'comment_link' => $link,
        ]);
    }
    /**
     * View all comments in page flow.
     *
     * @return void
     */
    public function viewAction()
    {
        $flow = $this->request->getRoute();
        $all = $this->comments->findFlow($flow);
        $link = $this->url->create('comment/add/' . $flow);
        $this->views->add('comment/commentsdb', [
            'comments' => $all,
            'comment_link' => $link,
        ]);
    }

    /**
     * Add new comment.
     *
     * @param integer $id of question or answer
     * @param string $q_or_a 'q' or 'a' for question or answer comment
     *
     * @return void
     */
    public function addAction($id, $q_or_a)
    {
        // TODO: Need to sweep session? How?
        // Set saveInSession = false instead.
        $this->di->session(); // Will load the session service which also starts the session
        $form = $this->createAddCommentForm($id, $q_or_a);
        $form->check([$this, 'callbackSuccess'], [$this, 'callbackFail']);
        // $this->di->theme->setTitle("Kommentera");
        $this->di->views->add('default/page', [
            'title' => "Kommentera",
            'content' => $form->getHTML()
        ]);
    }
    private function createAddCommentForm($id, $q_or_a)
    {
        return $this->di->form->create([], [
            'content' => [
                'type'        => 'textarea',
                'label'       => 'Comment:',
                'required'    => true,
                'validation'  => ['not_empty'],
            ],
            'q_or_a_id' => [
                'type'        => 'hidden',
                'value'       => $id,
            ],
            'q_or_a' => [
                'type'        => 'hidden',
                'value'       => $q_or_a,
            ],
            'submit' => [
                'type'      => 'submit',
                'callback'  => [$this, 'callbackSubmitAddComment'],
            ],
            'submit-fail' => [
                'type'      => 'submit',
                'callback'  => [$this, 'callbackSubmitFailAddComment'],
            ],
        ]);
    }
    /**
     * Callback for submit-button.
     *
     */
    public function callbackSubmitAddComment($form)
    {
        // $form->AddOutput("<p>DoSubmit(): Form was submitted.<p>");
        // $form->AddOutput("<p>Do stuff (save to database) and return true (success) or false (failed processing)</p>");
        // Save comment to database
        $now = time();
        $this->comments->save([
            'content' => $form->Value('content'),
            'q_or_a' => $form->Value('q_or_a'),
            'q_or_a_id' => $form->Value('q_or_a_id'),
            // TODO: fix real user.
            'user_id' => 3,
            'created' => $now,
        ]);

        // $form->AddOutput("<p><b>Id: " . $form->Value('q_or_a_id') . "</b></p>");
        // $form->AddOutput("<p><b>Kommentar: " . $form->Value('content') . "</b></p>");
        $form->saveInSession = false;
        // Unset ShowFormCorA so comment form wont be shown when returning to question.
        $this->session->set('ShowFormCorA', '');

        return true;
    }
    /**
     * Callback for submit-button.
     *
     */
    public function callbackSubmitFailAddComment($form)
    {
        // TODO: Remove this?
        // $form->AddOutput("<p><i>DoSubmitFail(): Form was submitted but I failed to process/save/validate it</i></p>");
        return false;
    }
    /**
     * Callback What to do if the form was submitted?
     *
     */
    public function callbackSuccess($form)
    {
        // $form->AddOUtput("<p><i>Form was submitted and the callback method returned true.</i></p>");
        // Redirect to page posted from.
        $this->redirectTo();
    }
    /**
     * Callback What to do when form could not be processed?
     *
     */
    public function callbackFail($form)
    {
        // $form->AddOutput("<p><i>Form was submitted and the Check() method returned false.</i></p>");
        // Redirect to comment form.
        $this->redirectTo();
    }


    /**
     * Delete a comment.
     *
     * @return void
     */
    public function deleteAction()
    {
        $id = $this->request->getGet('id');
        if (!isset($id)) {
            die("Missing id");
        }

        $res = $this->comments->delete($id);
        $this->redirectTo($_SERVER['HTTP_REFERER']);
    }
}
